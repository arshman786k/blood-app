/**
 * Admin Service
 * Handles admin-specific operations
 */

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { UserData } from '@/services/authService';
import { BloodTestRecord } from '@/services/bloodTestService';

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (limitCount: number = 100): Promise<UserData[]> => {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const users: UserData[] = [];

    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserData);
    });

    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get blood tests for a specific user (admin only)
 */
export const getUserTestsAdmin = async (userId: string): Promise<BloodTestRecord[]> => {
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
 * Delete user (admin only)
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'users', userId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Get statistics (admin only)
 */
export const getAdminStats = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const testsSnapshot = await getDocs(collection(db, 'blood_tests'));

    return {
      totalUsers: usersSnapshot.size,
      totalTests: testsSnapshot.size,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
