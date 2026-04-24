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
import { useAuth } from './AuthContext';

const AppDataContext = createContext();

const fallbackAnnouncements = [
  {
    id: 'a1',
    title: 'Welcome to Sri Lanka Travels',
    message: 'Book trusted drivers and premium vehicles for your island trip.',
    imageUrl: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString()
  }
];

const fallbackBlogs = [
  {
    id: 'b1',
    title: 'Top 5 Scenic Drives in Sri Lanka',
    excerpt: 'From Ella to Nuwara Eliya, discover unforgettable mountain roads.',
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
  const [driverTrips, setDriverTrips] = useState([]);
  const [adminInvites, setAdminInvites] = useState([]);

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

  useEffect(() => {
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        setBlogs(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
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
    await setDoc(doc(collection(db, 'blogs')), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateBlog = async (id, payload) => {
    await updateDoc(doc(db, 'blogs', id), {
      ...payload,
      updatedAt: serverTimestamp()
    });
  };

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, 'blogs', id));
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

  const createAdminInvite = async ({ hoursValid = 24 } = {}) => {
    if (!currentUser) {
      throw new Error('You must be logged in.');
    }

    const token = `invite-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
    const expiresAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    await setDoc(doc(db, 'adminInvites', token), {
      createdBy: currentUser.uid,
      createdAt: serverTimestamp(),
      expiresAt,
      used: false
    });

    return `${window.location.origin}/admin/signup?token=${encodeURIComponent(token)}`;
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
      driverTrips,
      adminInvites,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addBlog,
      updateBlog,
      deleteBlog,
      markStopAsCompleted,
      createAdminInvite,
      readAdminInvite
    }),
    [announcements, blogs, driverTrips, adminInvites]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
