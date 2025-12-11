#!/usr/bin/env bash

set -euo pipefail

echo "🔧 Running EAS post-install hook..."

# Verify critical native modules are installed
echo "📦 Verifying native modules..."

if [ ! -d "node_modules/react-native-vision-camera" ]; then
  echo "❌ react-native-vision-camera not found!"
  exit 1
fi

if [ ! -d "node_modules/react-native-fast-tflite" ]; then
  echo "❌ react-native-fast-tflite not found!"
  exit 1
fi

echo "✅ All native modules verified"

# Ensure proper permissions on gradlew
if [ -f "android/gradlew" ]; then
  chmod +x android/gradlew
  echo "✅ Set execute permissions on gradlew"
fi

echo "✅ Post-install hook completed successfully"
