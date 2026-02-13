/**
 * Firebase Configuration
 * 
 * ⚠️ IMPORTANT: Replace these values with your own Firebase project credentials
 * Get them from: Firebase Console > Project Settings > General > Your apps > Web app
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config - Updated with actual credentials
const firebaseConfig = {
  apiKey: "AIzaSyDxdeDQbw5pODU_xQ_63HScCx6hqmGlGyM",
  authDomain: "bloodapp-70131242.firebaseapp.com",
  projectId: "bloodapp-70131242",
  storageBucket: "bloodapp-70131242.firebasestorage.app",
  messagingSenderId: "1028723170778",
  appId: "1:1028723170778:web:07f45a26b94bf6298af4e3",
  measurementId: "G-G53RSK2E56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;
