/**
 * Admin User Detail Screen
 * View detailed user information and their test history
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getUserData, UserData } from '@/services/authService';
import { getUserTestsAdmin } from '@/services/adminService';
import { BloodTestRecord } from '@/services/bloodTestService';

export default function UserDetailScreen() {
  const router = useRouter();
  const { uid } = useLocalSearchParams();
  const { isAdmin } = useAuthStore();
  
  const [user, setUser] = useState<UserData | null>(null);
  const [tests, setTests] = useState<BloodTestRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace('/(tabs)');
      return;
    }
    loadUserData();
  }, [uid]);

  const loadUserData = async () => {
    if (!uid || typeof uid !== 'string') return;

    try {
      const userData = await getUserData(uid);
      const userTests = await getUserTestsAdmin(uid);
      
      setUser(userData);
      setTests(userTests);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>User not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      {/* User Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
        </View>
        
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        <View style={styles.badges}>
          {user.role === 'admin' && (
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>👑 Admin</Text>
            </View>
          )}
          {user.bloodGroup && (
            <View style={styles.bloodBadge}>
              <Text style={styles.bloodBadgeText}>{user.bloodGroup}</Text>
            </View>
          )}
        </View>

        <Text style={styles.joinDate}>Joined: {formatDate(user.createdAt)}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{tests.length}</Text>
          <Text style={styles.statLabel}>Tests</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.bloodGroup || 'N/A'}</Text>
          <Text style={styles.statLabel}>Blood Group</Text>
        </View>
      </View>

      {/* Test History */}
      <Text style={styles.sectionTitle}>Test History</Text>
      
      {tests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tests yet</Text>
        </View>
      ) : (
        tests.map((test, index) => (
          <View key={test.id || index} style={styles.testCard}>
            <View style={styles.testHeader}>
              <View style={styles.testBloodBadge}>
                <Text style={styles.testBloodText}>{test.bloodGroup}</Text>
              </View>
              <Text style={styles.testDate}>{formatDate(test.createdAt)}</Text>
            </View>

            {/* Scores */}
            <View style={styles.scoresRow}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-A</Text>
                <Text style={styles.scoreValue}>{(test.scores.antiA * 100).toFixed(0)}%</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-B</Text>
                <Text style={styles.scoreValue}>{(test.scores.antiB * 100).toFixed(0)}%</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-D</Text>
                <Text style={styles.scoreValue}>{(test.scores.antiD * 100).toFixed(0)}%</Text>
              </View>
            </View>

            {/* Images */}
            <View style={styles.imagesRow}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: test.images.antiA }} style={styles.thumbnail} />
                <Text style={styles.imageLabel}>Anti-A</Text>
              </View>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: test.images.antiB }} style={styles.thumbnail} />
                <Text style={styles.imageLabel}>Anti-B</Text>
              </View>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: test.images.antiD }} style={styles.thumbnail} />
                <Text style={styles.imageLabel}>Anti-D</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  headerBackButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: '#E53935',
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  adminBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  bloodBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bloodBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E53935',
  },
  joinDate: {
    fontSize: 12,
    color: '#999',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  testCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testBloodBadge: {
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  testBloodText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testDate: {
    fontSize: 11,
    color: '#666',
  },
  scoresRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  scoreItem: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  imagesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
  },
  imageLabel: {
    fontSize: 9,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
