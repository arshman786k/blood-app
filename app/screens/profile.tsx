/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { logOut } from '@/services/authService';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, userData, isAdmin } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logOut();
            router.replace('/auth/login');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userData?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{userData?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {userData?.bloodGroup && (
          <View style={styles.bloodGroupBadge}>
            <Text style={styles.bloodGroupText}>{userData.bloodGroup}</Text>
          </View>
        )}
        {isAdmin() && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>👑 Admin</Text>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/screens/history')}
        >
          <Text style={styles.menuIcon}>📋</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Test History</Text>
            <Text style={styles.menuSubtitle}>View your blood test records</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        {isAdmin() && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/admin/dashboard')}
          >
            <Text style={styles.menuIcon}>👨‍💼</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Admin Dashboard</Text>
              <Text style={styles.menuSubtitle}>Manage users and tests</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>ℹ️</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>About</Text>
            <Text style={styles.menuSubtitle}>App version & info</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Blood Group Detector v1.0{'\n'}
        AI-Powered Blood Type Analysis
      </Text>
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
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
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
  bloodGroupBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  bloodGroupText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },
  adminBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  logoutButtonText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 24,
    lineHeight: 18,
  },
});
