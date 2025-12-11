import React, { useRef, useEffect, useState } from "react";
import { View, Dimensions, TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import { Camera, useCameraDevices, useCameraPermission } from "react-native-vision-camera";
import OverlayFrame from "@/app/components/OverlayFrame";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const CameraScreen: React.FC = () => {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === "back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionRequested, setPermissionRequested] = useState(false);

  const FRAME_WIDTH = width * 0.9;
  const FRAME_HEIGHT = FRAME_WIDTH * 0.45;
  const CIRCLE_SIZE = FRAME_WIDTH / 6;
  const FRAME_Y = 160;

  useEffect(() => {
    if (!hasPermission && !permissionRequested) {
      setPermissionRequested(true);
      requestPermission();
    }
  }, [hasPermission, permissionRequested]);

  const capture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePhoto();

    router.push({
      pathname: "/camera/ProcessImage",
      params: {
        photoPath: photo.path,
        frameX: (width - FRAME_WIDTH) / 2,
        frameY: FRAME_Y,
        frameWidth: FRAME_WIDTH,
        frameHeight: FRAME_HEIGHT,
      },
    });
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.permissionButton, { marginTop: 10 }]} 
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.permissionButtonText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <OverlayFrame
        frameWidth={FRAME_WIDTH}
        frameHeight={FRAME_HEIGHT}
        circleSize={CIRCLE_SIZE}
        frameY={FRAME_Y}
      />

      <TouchableOpacity style={styles.btn} onPress={capture}>
        <Text style={{ color: "#fff" }}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 40,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CameraScreen;
