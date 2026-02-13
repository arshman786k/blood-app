/**
 * Welcome & Instructions Screen
 * Tab 1: Educate users about blood testing procedure
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🩸</Text>
        </View>
        <Text style={styles.title}>Blood Group Testing</Text>
        <Text style={styles.subtitle}>Safe & Accurate Detection</Text>
      </View>

      {/* What You'll Need */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 What You'll Need</Text>
        <View style={styles.card}>
          <View style={styles.itemRow}>
            <Text style={styles.itemIcon}>💉</Text>
            <Text style={styles.itemText}>Sterile lancet or needle</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemIcon}>🧪</Text>
            <Text style={styles.itemText}>Testing wells or clean surface</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemIcon}>💧</Text>
            <Text style={styles.itemText}>Anti-A, Anti-B, Anti-D reagents</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemIcon}>🧼</Text>
            <Text style={styles.itemText}>Alcohol swabs & cotton</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemIcon}>📱</Text>
            <Text style={styles.itemText}>Your phone for photos</Text>
          </View>
        </View>
      </View>

      {/* Step-by-Step Guide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔬 Step-by-Step Guide</Text>

        {/* Step 1 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Prepare & Clean</Text>
          </View>
          <Text style={styles.stepDescription}>
            • Wash hands thoroughly with soap{'\n'}
            • Clean finger tip with alcohol swab{'\n'}
            • Wait for it to dry completely{'\n'}
            • Prepare testing surface & reagents
          </Text>
        </View>

        {/* Step 2 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Extract Blood Sample</Text>
          </View>
          <Text style={styles.stepDescription}>
            • Use sterile lancet on side of fingertip{'\n'}
            • Gently squeeze to get 3 small drops{'\n'}
            • Place drops in separate wells{'\n'}
            • Use cotton to stop bleeding
          </Text>
          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              Always use sterile equipment. Dispose safely.
            </Text>
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Add Reagents</Text>
          </View>
          <Text style={styles.stepDescription}>
            • Add Anti-A to first drop{'\n'}
            • Add Anti-B to second drop{'\n'}
            • Add Anti-D (Rh) to third drop{'\n'}
            • Mix gently with separate sticks
          </Text>
        </View>

        {/* Step 4 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Wait & Observe</Text>
          </View>
          <Text style={styles.stepDescription}>
            • Wait 2-3 minutes for reaction{'\n'}
            • Look for clumping (agglutination){'\n'}
            • Smooth = Negative, Clumpy = Positive{'\n'}
            • Ensure good lighting for photos
          </Text>
        </View>

        {/* Step 5 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <Text style={styles.stepTitle}>Capture Photos</Text>
          </View>
          <Text style={styles.stepDescription}>
            • Take clear, well-lit photos{'\n'}
            • Capture all three reactions{'\n'}
            • Keep camera steady{'\n'}
            • Avoid shadows or glare
          </Text>
        </View>
      </View>

      {/* Safety Guidelines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Safety Guidelines</Text>
        <View style={styles.safetyCard}>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>✅</Text>
            <Text style={styles.safetyText}>
              Always use sterile equipment
            </Text>
          </View>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>✅</Text>
            <Text style={styles.safetyText}>
              Dispose lancets in sharps container
            </Text>
          </View>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>✅</Text>
            <Text style={styles.safetyText}>
              Clean testing area after use
            </Text>
          </View>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>✅</Text>
            <Text style={styles.safetyText}>
              Wash hands before and after
            </Text>
          </View>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>❌</Text>
            <Text style={styles.safetyText}>
              Never share testing equipment
            </Text>
          </View>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyIcon}>❌</Text>
            <Text style={styles.safetyText}>
              Don't test if you have infections
            </Text>
          </View>
        </View>
      </View>

      {/* Understanding Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Understanding Results</Text>
        <View style={styles.card}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Agglutination (Clumping)</Text> = Positive{'\n'}
            <Text style={styles.bold}>No Clumping (Smooth)</Text> = Negative
          </Text>
          <View style={styles.divider} />
          <Text style={styles.exampleTitle}>Examples:</Text>
          <Text style={styles.exampleText}>
            • Anti-A ✓, Anti-B ✗, Anti-D ✓ = A+{'\n'}
            • Anti-A ✗, Anti-B ✓, Anti-D ✗ = B-{'\n'}
            • Anti-A ✓, Anti-B ✓, Anti-D ✓ = AB+{'\n'}
            • Anti-A ✗, Anti-B ✗, Anti-D ✗ = O-
          </Text>
        </View>
      </View>

      {/* Important Notes */}
      <View style={styles.noteBox}>
        <Text style={styles.noteIcon}>💡</Text>
        <View style={styles.noteContent}>
          <Text style={styles.noteTitle}>Important Notes</Text>
          <Text style={styles.noteText}>
            • This app assists detection but is not a medical diagnosis{'\n'}
            • Always verify results with professional lab testing{'\n'}
            • Consult healthcare provider for medical decisions{'\n'}
            • Keep test history for reference
          </Text>
        </View>
      </View>

      {/* Ready to Test */}
      <View style={styles.readyCard}>
        <Text style={styles.readyIcon}>🚀</Text>
        <Text style={styles.readyTitle}>Ready to Test?</Text>
        <Text style={styles.readyText}>
          Go to the "Detect" tab to capture your test photos
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  stepDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
  safetyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  safetyText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noteIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 20,
  },
  readyCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  readyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  readyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  readyText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
