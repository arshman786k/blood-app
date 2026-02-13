/**
 * Blood Test Service
 * Handles all blood test related operations with Firestore
 */

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface BloodTestRecord {
  id?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  bloodGroup: string;
  scores: {
    antiA: number;
    antiB: number;
    antiD: number;
  };
  images: {
    antiA: string;
    antiB: string;
    antiD: string;
  };
  createdAt: any;
}

/**
 * Save blood test result to Firestore
 */
export const saveBloodTest = async (testData: Omit<BloodTestRecord, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'blood_tests'), {
      ...testData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get user's blood test history
 */
export const getUserBloodTests = async (userId: string): Promise<BloodTestRecord[]> => {
  try {
    const q = query(
      collection(db, 'blood_tests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const tests: BloodTestRecord[] = [];

    querySnapshot.forEach((doc) => {
      tests.push({ id: doc.id, ...doc.data() } as BloodTestRecord);
    });

    return tests;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get all blood tests (for admin)
 */
export const getAllBloodTests = async (limitCount: number = 100): Promise<BloodTestRecord[]> => {
  try {
    const q = query(
      collection(db, 'blood_tests'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const tests: BloodTestRecord[] = [];

    querySnapshot.forEach((doc) => {
      tests.push({ id: doc.id, ...doc.data() } as BloodTestRecord);
    });

    return tests;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get single blood test by ID
 */
export const getBloodTestById = async (testId: string): Promise<BloodTestRecord | null> => {
  try {
    const docRef = doc(db, 'blood_tests', testId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BloodTestRecord;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
