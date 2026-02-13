/**
 * Test History Screen
 * Shows user's blood test history
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getUserBloodTests, BloodTestRecord } from '@/services/bloodTestService';

export default function HistoryScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [tests, setTests] = useState<BloodTestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const history = await getUserBloodTests(user.uid);
      setTests(history);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
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
        <Text style={styles.loadingText}>Loading history...</Text>
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
        <Text style={styles.title}>Test History</Text>
        <Text style={styles.subtitle}>Your blood test records</Text>
      </View>

      {/* History List */}
      {tests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>No tests yet</Text>
          <Text style={styles.emptySubtext}>Take your first blood test!</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.emptyButtonText}>Start Test</Text>
          </TouchableOpacity>
        </View>
      ) : (
        tests.map((test, index) => (
          <View key={test.id || index} style={styles.testCard}>
            <View style={styles.testHeader}>
              <View style={styles.bloodGroupBadge}>
                <Text style={styles.bloodGroupText}>{test.bloodGroup}</Text>
              </View>
              <Text style={styles.testDate}>{formatDate(test.createdAt)}</Text>
            </View>

            {/* Scores */}
            <View style={styles.scoresContainer}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-A</Text>
                <Text style={styles.scoreValue}>
                  {(test.scores.antiA * 100).toFixed(0)}%
                </Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-B</Text>
                <Text style={styles.scoreValue}>
                  {(test.scores.antiB * 100).toFixed(0)}%
                </Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Anti-D</Text>
                <Text style={styles.scoreValue}>
                  {(test.scores.antiD * 100).toFixed(0)}%
                </Text>
              </View>
            </View>

            {/* Images */}
            <View style={styles.imagesContainer}>
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
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  header: {
    marginBottom: 24,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  testCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  bloodGroupBadge: {
    backgroundColor: '#E53935',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bloodGroupText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  testDate: {
    fontSize: 12,
    color: '#666',
  },
  scoresContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  scoreItem: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 6,
  },
  imageLabel: {
    fontSize: 10,
    color: '#666',
  },
});
