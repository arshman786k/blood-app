/**
 * Splash Screen Component
 * Shows a beautiful loading animation on app startup
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized) {
      // Navigate based on auth state
      setTimeout(() => {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/login');
        }
      }, 1500); // Show splash for 1.5 seconds
    }
  }, [initialized, user]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Blood Drop Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.bloodIcon}>🩸</Text>
        </View>
        
        <Text style={styles.title}>Blood Group Detector</Text>
        <Text style={styles.subtitle}>AI-Powered Blood Type Analysis</Text>
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
      
      <Text style={styles.footer}>Powered by Machine Learning</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bloodIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  loadingContainer: {
    width: 200,
    marginTop: 20,
  },
  loadingBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '60%',
    backgroundColor: '#E53935',
    borderRadius: 2,
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});
