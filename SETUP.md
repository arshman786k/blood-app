# Blood Group Detection App - Setup Guide

## ⚠️ Important: This App Requires Development Build

This app uses **native modules** (`react-native-vision-camera` and `react-native-fast-tflite`) that **DO NOT work** with **Expo Go**.

## 🚀 How to Run This App

### Option 1: Local Development Build (Recommended for Testing)

#### For Android:

1. **Install Prerequisites:**
   ```powershell
   # Install Android Studio and setup Android SDK
   # Make sure ANDROID_HOME environment variable is set
   ```

2. **Build and Run:**
   ```powershell
   # Generate native Android project
   npx expo prebuild --platform android
   
   # Run on Android device/emulator
   npx expo run:android
   ```

#### For iOS (Mac Only):

1. **Install Prerequisites:**
   ```bash
   # Install Xcode from App Store
   # Install CocoaPods
   sudo gem install cocoapods
   ```

2. **Build and Run:**
   ```bash
   # Generate native iOS project
   npx expo prebuild --platform ios
   
   # Install iOS dependencies
   cd ios && pod install && cd ..
   
   # Run on iOS device/simulator
   npx expo run:ios
   ```

### Option 2: EAS Build (For Production/Distribution)

1. **Install EAS CLI:**
   ```powershell
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```powershell
   eas login
   ```

3. **Configure EAS:**
   ```powershell
   eas build:configure
   ```

4. **Build APK for Android:**
   ```powershell
   # Development build
   eas build --profile development --platform android
   
   # Production build
   eas build --profile production --platform android
   ```

5. **Install the APK** on your device when build completes

## 📦 Dependencies

### Native Modules (Require Development Build):
- `react-native-vision-camera` - Camera access
- `react-native-fast-tflite` - TensorFlow Lite model inference

### Other Dependencies:
- `expo-image-manipulator` - Image cropping and processing
- `expo-router` - Navigation

## 🔧 Project Structure

```
BloodApp/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── camera/            # Camera screens
│   └── components/        # UI components
├── src/                   # Business logic (not routed)
│   ├── tflite/           # TensorFlow Lite model handling
│   ├── logic/            # Blood detection logic
│   └── utils/            # Helper functions
├── assets/
│   └── model/            # TFLite model file
└── ...
```

## 🎯 How It Works

1. User opens camera from home screen
2. Camera displays overlay frame with 3 circles
3. User captures photo of blood test card
4. Image is cropped to frame
5. Image is split into 3 parts (Anti-A, Anti-B, Anti-D)
6. TFLite model analyzes each part for agglutination
7. Blood group is determined and displayed

## ⚙️ Configuration

### Camera Permissions
Already configured in `app.json`:
```json
{
  "android": {
    "permissions": ["CAMERA"]
  }
}
```

### Metro Config
`.tflite` files are configured as assets in `metro.config.js`

## 🐛 Troubleshooting

### Error: "react-native-vision-camera is not supported in Expo Go"
**Solution:** You must use a development build. Run `npx expo run:android` or use EAS Build.

### Error: "TurboModuleRegistry.getEnforcing(...): 'Tflite' could not be found"
**Solution:** Native modules not linked. Run `npx expo prebuild` then `npx expo run:android`.

### Build Fails
**Solution:** Clean and rebuild:
```powershell
# Clean
Remove-Item -Path android,ios -Recurse -Force
npx expo prebuild
npx expo run:android
```

## 📱 Testing

1. Build the app using one of the methods above
2. Open the app on your device
3. Grant camera permissions
4. Tap "Start Test"
5. Point camera at blood test card
6. Capture and wait for results

## 🔄 Development Workflow

```powershell
# Start Metro bundler
npx expo start --dev-client

# In another terminal, run on device
npx expo run:android
# or
npx expo run:ios
```

## 📝 Notes

- The TFLite model currently uses placeholder tensor conversion
- For production, implement proper image-to-tensor conversion
- Model accuracy depends on proper image preprocessing
- Ensure good lighting when capturing images
