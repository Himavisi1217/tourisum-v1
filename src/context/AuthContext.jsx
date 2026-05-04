import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();
const SUPER_ADMIN_EMAILS = [
  'superadmin1@tourisum.app',
  'ekanyake17@gmail.com',
  'admin1217@-su',
  'himavisiekanayake676@gmail.com'
];

export function useAuth() {
  return useContext(AuthContext);
}

function isSuperAdminEmail(email) {
  if (!email) {
    return false;
  }

  return SUPER_ADMIN_EMAILS.includes(String(email).trim().toLowerCase());
}

function normalizeRole(roleValue) {
  if (!roleValue) {
    return '';
  }

  const normalized = String(roleValue).trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (normalized === 'superadmin') {
    return 'super_admin';
  }
  return normalized;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up a regular user
  async function signupUser(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: 'user',
      createdAt: new Date().toISOString()
    });
    
    return userCredential;
  }

  // Sign up a driver
  async function signupDriver(email, password, driverData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...driverData,
      email: email,
      role: 'driver',
      createdAt: new Date().toISOString()
    });
    
    return userCredential;
  }

  // General login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signupAdminWithInvite(token, name, email, password) {
    const inviteRef = doc(db, 'adminInvites', token);
    const inviteSnap = await getDoc(inviteRef);

    if (!inviteSnap.exists()) {
      throw new Error('Invalid invite link.');
    }

    const inviteData = inviteSnap.data();
    if (inviteData.used) {
      throw new Error('This invite link has already been used.');
    }

    const expiresDate = inviteData.expiresAt?.toDate ? inviteData.expiresAt.toDate() : null;
    if (expiresDate && expiresDate.getTime() < Date.now()) {
      throw new Error('This invite link has expired.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      invitedBy: inviteData.createdBy || null
    });

    await updateDoc(inviteRef, {
      used: true,
      usedAt: serverTimestamp(),
      usedByUid: user.uid
    });

    return userCredential;
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user document to get their role
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              ...data,
              role: isSuperAdminEmail(user.email) ? 'super_admin' : normalizeRole(data.role)
            });
          } else {
            if (isSuperAdminEmail(user.email)) {
              setUserData({
                name: 'superadmin1',
                email: user.email,
                role: 'super_admin'
              });
            } else {
              setUserData(null);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (isSuperAdminEmail(user.email)) {
            setUserData({
              name: 'superadmin1',
              email: user.email,
              role: 'super_admin'
            });
          } else {
            setUserData(null);
          }
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signupUser,
    signupDriver,
    signupAdminWithInvite,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
