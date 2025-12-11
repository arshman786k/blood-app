import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import cropImageFromFile from "../../src/utils/cropHelper";
import splitImageFromFile from "../../src/utils/splitHelper";
import { detectBloodGroup } from "../../src/logic/detectBloodGroup";
import { loadModel } from "../../src/tflite/runModel";

const ProcessImage: React.FC = () => {
  const params = useLocalSearchParams();
  const [status, setStatus] = useState("Loading model...");
  const [bloodGroup, setBloodGroup] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    try {
      // Load model first
      setStatus("Loading AI model...");
      await loadModel();

      // Crop the image
      setStatus("Cropping image...");
      const cropped = await cropImageFromFile(params);

      // Split into 3 parts
      setStatus("Splitting image...");
      const parts = await splitImageFromFile(cropped);

      if (parts.length !== 3) {
        throw new Error("Failed to split image into 3 parts");
      }

      // Detect blood group
      setStatus("Analyzing blood group...");
      const result = await detectBloodGroup(parts);
      
      setBloodGroup(result);
      setStatus("Complete!");

      // Navigate to results or show result
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err) {
      console.error("Processing error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setStatus("Error");
    }
  };

  useEffect(() => {
    handleProcess();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.status}>{status}</Text>
      {bloodGroup && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Blood Group:</Text>
          <Text style={styles.resultValue}>{bloodGroup}</Text>
        </View>
      )}
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  resultContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 18,
    color: "#666",
  },
  resultValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
  },
  error: {
    marginTop: 20,
    fontSize: 14,
    color: "#FF3B30",
    textAlign: "center",
  },
});

export default ProcessImage;
