/**
 * Admin Users List Screen
 * View and manage all users
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getAllUsers } from '@/services/adminService';
import { UserData } from '@/services/authService';

export default function AdminUsersScreen() {
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.replace('/(tabs)');
      return;
    }
    loadUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E53935']} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>All Users</Text>
        <Text style={styles.subtitle}>{users.length} total users</Text>
      </View>

      {/* Users List */}
      {users.map((user, index) => (
        <TouchableOpacity
          key={user.uid || index}
          style={styles.userCard}
          onPress={() => router.push(`/admin/user-detail?uid=${user.uid}`)}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userDate}>Joined: {formatDate(user.createdAt)}</Text>
          </View>

          <View style={styles.userBadges}>
            {user.role === 'admin' && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>Admin</Text>
              </View>
            )}
            {user.bloodGroup && (
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodBadgeText}>{user.bloodGroup}</Text>
              </View>
            )}
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
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
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 18,
    color: '#E53935',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 11,
    color: '#999',
  },
  userBadges: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  adminBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  bloodBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  bloodBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E53935',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});
