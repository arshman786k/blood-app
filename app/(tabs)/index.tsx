import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import { saveBloodTest } from "@/services/bloodTestService";

const API_URL = "http://192.168.86.57:5001/api/predict";  // Flask API URL

export default function Index() {
  const router = useRouter();
  const { user, userData } = useAuthStore();
  
  const [antiA, setAntiA] = useState<any>(null);
  const [antiB, setAntiB] = useState<any>(null);
  const [antiD, setAntiD] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // =====================
  // CAMERA
  // =====================
  const takePhoto = async (setter: (val: any) => void) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Camera allow karo");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled) {
      setter(res.assets[0]);
    }
  };

  // =====================
  // GALLERY
  // =====================
  const pickFromGallery = async (setter: (val: any) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery access allow karo");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!res.canceled) {
      setter(res.assets[0]);
    }
  };

  // =====================
  // FormData Image (FIXED)
  // =====================
  const createFormDataImage = (asset: any, key: string) => {
    return {
      uri: asset.uri,
      name: `${key}_${Date.now()}.jpg`, // ✅ UNIQUE NAME
      type: "image/jpeg",
    } as any;
  };

  // =====================
  // SUBMIT WITH CLOUDINARY & FIREBASE
  // =====================
  const submitImages = async () => {
    if (!antiA || !antiB || !antiD) {
      Alert.alert("Missing Images", "Please capture all three images");
      return;
    }

    if (!user) {
      Alert.alert("Error", "Please login first");
      return;
    }

    setLoading(true);
    setResult(null);
    setUploadProgress('Analyzing images...');

    const formData = new FormData();
    formData.append("antiA", createFormDataImage(antiA, "antiA"));
    formData.append("antiB", createFormDataImage(antiB, "antiB"));
    formData.append("antiD", createFormDataImage(antiD, "antiD"));

    try {
      // Step 1: Send to Flask API for prediction
      setUploadProgress('Getting prediction...');
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      
      // Step 2: Upload images to Cloudinary
      setUploadProgress('Uploading images...');
      const [antiAUrl, antiBUrl, antiDUrl] = await Promise.all([
        uploadImageToCloudinary(antiA.uri, `blood-tests/${user.uid}`),
        uploadImageToCloudinary(antiB.uri, `blood-tests/${user.uid}`),
        uploadImageToCloudinary(antiD.uri, `blood-tests/${user.uid}`),
      ]);

      // Step 3: Save to Firestore
      setUploadProgress('Saving results...');
      await saveBloodTest({
        userId: user.uid,
        userName: userData?.name || user.displayName || 'Unknown',
        userEmail: user.email || '',
        bloodGroup: data.blood_group,
        scores: data.scores,
        images: {
          antiA: antiAUrl,
          antiB: antiBUrl,
          antiD: antiDUrl,
        },
        createdAt: new Date(),
      });

      // Show result
      setResult(data);
      setUploadProgress('');
      
      Alert.alert(
        'Success!',
        `Your blood group is ${data.blood_group}`,
        [
          {
            text: 'View History',
            onPress: () => router.push('/screens/history'),
          },
          { text: 'OK' },
        ]
      );
    } catch (error: any) {
      console.error('Submission error:', error);
      Alert.alert("Error", error.message || "Something went wrong");
      setUploadProgress('');
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // UI - MODERN DESIGN
  // =====================
  const renderImageCard = (title: string, description: string, img: any, setter: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => takePhoto(setter)}
          disabled={loading}
        >
          <Text style={styles.iconButtonEmoji}>📷</Text>
          <Text style={styles.iconButtonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => pickFromGallery(setter)}
          disabled={loading}
        >
          <Text style={styles.iconButtonEmoji}>🖼️</Text>
          <Text style={styles.iconButtonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {img && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: img.uri }} style={styles.imagePreview} />
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>🩸</Text>
        </View>
        <Text style={styles.headerTitle}>Blood Group Detection</Text>
        <Text style={styles.headerSubtitle}>
          Upload images of agglutination tests
        </Text>
      </View>

      {/* Image Upload Cards */}
      {renderImageCard("Anti-A Serum", "Test with Anti-A reagent", antiA, setAntiA)}
      {renderImageCard("Anti-B Serum", "Test with Anti-B reagent", antiB, setAntiB)}
      {renderImageCard("Anti-D (Rh) Serum", "Test with Anti-D reagent", antiD, setAntiD)}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={submitImages}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.submitButtonText}>{uploadProgress || 'Processing...'}</Text>
          </View>
        ) : (
          <Text style={styles.submitButtonText}>Detect Blood Group</Text>
        )}
      </TouchableOpacity>

      {/* Result Card */}
      {result && !loading && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultIcon}>🎯</Text>
            <Text style={styles.resultTitle}>Result</Text>
          </View>
          
          <View style={styles.bloodGroupBadge}>
            <Text style={styles.bloodGroupText}>{result.blood_group}</Text>
          </View>

          <View style={styles.scoresContainer}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>Anti-A</Text>
              <Text style={styles.scoreValue}>{(result.scores.antiA * 100).toFixed(1)}%</Text>
            </View>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>Anti-B</Text>
              <Text style={styles.scoreValue}>{(result.scores.antiB * 100).toFixed(1)}%</Text>
            </View>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>Anti-D (Rh)</Text>
              <Text style={styles.scoreValue}>{(result.scores.antiD * 100).toFixed(1)}%</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// =====================
// Styles - MODERN UI
// =====================
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIconText: {
    fontSize: 35,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconButtonEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  iconButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  imagePreviewContainer: {
    marginTop: 16,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#E53935',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  bloodGroupBadge: {
    backgroundColor: '#E53935',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  bloodGroupText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoresContainer: {
    gap: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
});
