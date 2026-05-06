import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebase';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';
import { destinations as fallbackDestinations } from '../data/destinationsData';

const AppDataContext = createContext();

const fallbackAnnouncements = [
  {
    id: 'a1',
    title: 'Welcome to Serendib Travels',
    message: 'Book trusted drivers and premium vehicles for your island trip.',
    type: 'banner',
    imageUrl: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString()
  }
];

const fallbackBlogs = [
  {
    id: 'b1',
    title: 'Top 5 Scenic Drives in Sri Lanka',
    excerpt: 'From Ella to Nuwara Eliya, discover unforgettable mountain roads.',
    type: 'travel_guide',
    content: '<p>Use the admin panel to add rich blog content with TinyMCE.</p>',
    coverImageUrl: 'https://images.unsplash.com/photo-1571244277491-0aebd73d8d2d?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString()
  }
];

const fallbackTrips = [
  {
    id: 't1',
    assignedDriverId: '',
    passengerName: 'Guest Traveler',
    status: 'upcoming',
    date: new Date().toISOString().slice(0, 10),
    pickupTime: '09:00',
    stops: [
      { name: 'Colombo Airport', completed: true },
      { name: 'Dambulla Cave Temple', completed: false },
      { name: 'Sigiriya Rock Fortress', completed: false }
    ]
  }
];

export function useAppData() {
  return useContext(AppDataContext);
}

export function AppDataProvider({ children }) {
  const { currentUser, userData } = useAuth();
  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [driverTrips, setDriverTrips] = useState([]);
  const [adminInvites, setAdminInvites] = useState([]);
  const [driverRequests, setDriverRequests] = useState([]);
  const [contentRequests, setContentRequests] = useState([]);

  useEffect(() => {
    const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      announcementsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        setAnnouncements(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {}
    );

    return unsubscribe;
  }, []);

  // Fetch blogs from Supabase and subscribe to realtime changes
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setBlogs(data.map((row) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt,
          type: row.type,
          coverImageUrl: row.cover_image_url,
          content: row.content,
          createdAt: row.created_at,
          updatedAt: row.updated_at
        })));
      }
    };

    fetchBlogs();

    // Subscribe to realtime INSERT, UPDATE, DELETE on the blogs table
    const channel = supabase
      .channel('blogs-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, () => {
        // Re-fetch on any change for simplicity
        fetchBlogs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const destinationsQuery = query(collection(db, 'destinations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      destinationsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        setDestinations(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {}
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser || userData?.role !== 'driver') {
      setDriverTrips([]);
      return undefined;
    }

    const tripsQuery = query(
      collection(db, 'trips'),
      where('assignedDriverId', '==', currentUser.uid),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(
      tripsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setDriverTrips(
            fallbackTrips.map((trip) => ({ ...trip, assignedDriverId: currentUser.uid }))
          );
          return;
        }
        setDriverTrips(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {
        setDriverTrips(fallbackTrips.map((trip) => ({ ...trip, assignedDriverId: currentUser.uid })));
      }
    );

    return unsubscribe;
  }, [currentUser, userData?.role]);

  useEffect(() => {
    if (userData?.role !== 'super_admin') {
      setAdminInvites([]);
      return undefined;
    }

    const invitesQuery = query(collection(db, 'adminInvites'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      invitesQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setAdminInvites([]);
          return;
        }
        setAdminInvites(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {
        setAdminInvites([]);
      }
    );

    return unsubscribe;
  }, [userData?.role]);

  // Listen for driver signup requests (admin/super_admin only)
  useEffect(() => {
    if (!userData || !['admin', 'super_admin'].includes(userData.role)) {
      setDriverRequests([]);
      return undefined;
    }

    const requestsQuery = query(collection(db, 'driverRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setDriverRequests([]);
          return;
        }
        setDriverRequests(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {
        setDriverRequests([]);
      }
    );

    return unsubscribe;
  }, [userData?.role]);

  useEffect(() => {
    if (!userData || !['admin', 'super_admin'].includes(userData.role)) {
      setContentRequests([]);
      return undefined;
    }

    const contentRequestsQuery = query(collection(db, 'contentRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      contentRequestsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setContentRequests([]);
          return;
        }
        setContentRequests(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      },
      () => {
        setContentRequests([]);
      }
    );

    return unsubscribe;
  }, [userData?.role]);

  // Submit a driver signup request (from public signup form)
  const submitDriverRequest = async (requestData) => {
    await setDoc(doc(collection(db, 'driverRequests')), {
      ...requestData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  };

  // Approve a driver request (admin creates the account info, driver uses it to login)
  const approveDriverRequest = async (requestId) => {
    await updateDoc(doc(db, 'driverRequests', requestId), {
      status: 'approved',
      reviewedBy: currentUser?.uid || 'unknown',
      reviewedAt: serverTimestamp()
    });
  };

  // Reject a driver request
  const rejectDriverRequest = async (requestId, reason) => {
    await updateDoc(doc(db, 'driverRequests', requestId), {
      status: 'rejected',
      rejectionReason: reason || '',
      reviewedBy: currentUser?.uid || 'unknown',
      reviewedAt: serverTimestamp()
    });
  };

  const submitContentRequest = async ({ type, payload }) => {
    if (!currentUser || !userData || !['admin', 'super_admin'].includes(userData.role)) {
      throw new Error('Only admin users can submit content requests.');
    }

    await setDoc(doc(collection(db, 'contentRequests')), {
      type,
      payload,
      status: 'pending',
      submittedByUid: currentUser.uid,
      submittedByName: userData.name || '',
      submittedByEmail: userData.email || currentUser.email || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const approveContentRequest = async (requestId) => {
    if (!currentUser || userData?.role !== 'super_admin') {
      throw new Error('Only super admins can approve content requests.');
    }

    const requestRef = doc(db, 'contentRequests', requestId);
    const requestSnap = await getDoc(requestRef);
    if (!requestSnap.exists()) {
      throw new Error('Request not found.');
    }

    const requestData = requestSnap.data();
    if (requestData.status !== 'pending') {
      throw new Error('Only pending requests can be approved.');
    }

    if (requestData.type === 'announcement') {
      await addAnnouncement(requestData.payload || {});
    } else if (requestData.type === 'blog') {
      await addBlog(requestData.payload || {});
    } else {
      throw new Error('Unsupported request type.');
    }

    await updateDoc(requestRef, {
      status: 'approved',
      reviewedBy: currentUser.uid,
      reviewedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const rejectContentRequest = async (requestId, reason = '') => {
    if (!currentUser || userData?.role !== 'super_admin') {
      throw new Error('Only super admins can reject content requests.');
    }

    await updateDoc(doc(db, 'contentRequests', requestId), {
      status: 'rejected',
      rejectionReason: reason,
      reviewedBy: currentUser.uid,
      reviewedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const addAnnouncement = async (payload) => {
    await setDoc(doc(collection(db, 'announcements')), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateAnnouncement = async (id, payload) => {
    await updateDoc(doc(db, 'announcements', id), {
      ...payload,
      updatedAt: serverTimestamp()
    });
  };

  const deleteAnnouncement = async (id) => {
    await deleteDoc(doc(db, 'announcements', id));
  };

  const addBlog = async (payload) => {
    const { error } = await supabase.from('blogs').insert({
      title: payload.title,
      excerpt: payload.excerpt,
      type: payload.type,
      cover_image_url: payload.coverImageUrl || '',
      content: payload.content
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  const updateBlog = async (id, payload) => {
    const { error } = await supabase
      .from('blogs')
      .update({
        title: payload.title,
        excerpt: payload.excerpt,
        type: payload.type,
        cover_image_url: payload.coverImageUrl || '',
        content: payload.content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
  };

  const addDestination = async (payload) => {
    const destinationId = payload.id?.trim();
    if (!destinationId) {
      throw new Error('Destination ID is required.');
    }

    await setDoc(doc(db, 'destinations', destinationId), {
      ...payload,
      id: destinationId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateDestination = async (id, payload) => {
    await updateDoc(doc(db, 'destinations', id), {
      ...payload,
      updatedAt: serverTimestamp()
    });
  };

  const deleteDestination = async (id) => {
    await deleteDoc(doc(db, 'destinations', id));
  };

  const markStopAsCompleted = async (tripId, stopIndex) => {
    const targetTrip = driverTrips.find((trip) => trip.id === tripId);
    if (!targetTrip) {
      return;
    }

    const nextStops = targetTrip.stops.map((stop, index) =>
      index === stopIndex ? { ...stop, completed: true } : stop
    );

    const allCompleted = nextStops.every((stop) => stop.completed);
    try {
      await updateDoc(doc(db, 'trips', tripId), {
        stops: nextStops,
        status: allCompleted ? 'completed' : 'in_progress',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      setDriverTrips((previous) =>
        previous.map((trip) =>
          trip.id === tripId
            ? { ...trip, stops: nextStops, status: allCompleted ? 'completed' : 'in_progress' }
            : trip
        )
      );
    }
  };

  const generateSecureNumericToken = (length = 12) => {
    const digits = '0123456789';
    let token = '';
    const randomBytes = new Uint8Array(length);
    window.crypto.getRandomValues(randomBytes);

    for (let index = 0; index < length; index += 1) {
      token += digits[randomBytes[index] % 10];
    }

    return token;
  };

  const createAdminInvite = async ({ hoursValid = 24 } = {}) => {
    if (!currentUser) {
      throw new Error('You must be logged in.');
    }
    if (userData?.role !== 'super_admin') {
      throw new Error('Only super admins can generate invite links.');
    }

    let token = '';
    let tokenAvailable = false;
    let attempt = 0;
    while (attempt < 5) {
      const numericToken = generateSecureNumericToken(12);
      token = `invite-${numericToken}`;
      // Prevent accidental overwrite if an identical token already exists.
      // Collision chance is very low, but we still check for safety.
      const existingInvite = await getDoc(doc(db, 'adminInvites', token));
      if (!existingInvite.exists()) {
        tokenAvailable = true;
        break;
      }
      attempt += 1;
    }
    if (!tokenAvailable) {
      throw new Error('Failed to generate invite token.');
    }
    const expiresAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    await setDoc(doc(db, 'adminInvites', token), {
      createdBy: currentUser.uid,
      createdAt: serverTimestamp(),
      expiresAt,
      used: false
    });

    return `${window.location.origin}/portal-admin/signup?token=${encodeURIComponent(token)}`;
  };

  const readAdminInvite = async (token) => {
    const inviteRef = doc(db, 'adminInvites', token);
    const inviteSnap = await getDoc(inviteRef);
    if (!inviteSnap.exists()) {
      return { valid: false, reason: 'Invalid invite link.' };
    }
    const invite = inviteSnap.data();
    if (invite.used) {
      return { valid: false, reason: 'Invite link already used.' };
    }
    const expiresDate = invite.expiresAt?.toDate ? invite.expiresAt.toDate() : null;
    if (expiresDate && expiresDate.getTime() < Date.now()) {
      return { valid: false, reason: 'Invite link expired.' };
    }
    return { valid: true, invite };
  };

  const value = useMemo(
    () => ({
      announcements,
      blogs,
      destinations,
      driverTrips,
      adminInvites,
      driverRequests,
      contentRequests,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addBlog,
      updateBlog,
      deleteBlog,
      addDestination,
      updateDestination,
      deleteDestination,
      markStopAsCompleted,
      createAdminInvite,
      readAdminInvite,
      submitDriverRequest,
      approveDriverRequest,
      rejectDriverRequest,
      submitContentRequest,
      approveContentRequest,
      rejectContentRequest
    }),
    [announcements, blogs, destinations, driverTrips, adminInvites, driverRequests, contentRequests]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

