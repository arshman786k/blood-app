/**
 * Authentication Service
 * Handles all Firebase Authentication operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bloodGroup?: string;
  createdAt: any;
}

/**
 * Sign up new user
 */
export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: 'user' | 'admin' = 'user'
): Promise<User> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: name });

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Sign in existing user
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Sign out current user
 */
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Update user blood group
 */
export const updateUserBloodGroup = async (uid: string, bloodGroup: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', uid), { bloodGroup }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
