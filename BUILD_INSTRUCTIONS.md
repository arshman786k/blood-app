# EAS Build Configuration - Android APK

## Changes Made to Fix Build Errors

### 1. Updated `eas.json`
- Added `buildType: "apk"` for all profiles (development, preview, production)
- Specified `gradleCommand: ":app:assembleDebug"` for development builds
- Added `image: "latest"` to use the latest EAS build image
- Added environment variable `EXPO_NO_CAPABILITY_SYNC: "1"` to skip capability sync
- Added caching for `node_modules` and `android/.gradle` to speed up builds
- Added `postInstallCommand` to ensure proper permissions on build scripts

### 2. Updated `android/gradle.properties`
- Added Gradle daemon and configure-on-demand settings for faster builds
- Disabled minification for development builds (`android.enableMinifyInReleaseBuilds=false`)
- Disabled resource shrinking for development builds
- Added packaging options to handle duplicate C++ shared libraries from native modules:
  - `android.packagingOptions.pickFirsts` for libc++_shared.so across all architectures

### 3. Created Build Hooks
- **`eas-hooks/eas-build-pre-install.sh`**: Cleans build artifacts before installation
- **`eas-hooks/eas-build-post-install.sh`**: Verifies native modules and sets permissions

### 4. Created `.easignore`
- Excludes unnecessary files from the EAS build upload to speed up the build process

## How to Build the APK

### Development Build (for testing with Expo Go features)
```bash
eas build --profile development --platform android
```

### Preview Build (for internal testing)
```bash
eas build --profile preview --platform android
```

### Production Build (for release)
```bash
eas build --profile production --platform android
```

## What These Fixes Address

1. **Gradle Build Errors**: 
   - Proper build type configuration (APK vs AAB)
   - Correct Gradle command for debug builds
   - Proper handling of native library conflicts

2. **Native Module Issues**:
   - `react-native-vision-camera` - camera access for blood test capture
   - `react-native-fast-tflite` - TensorFlow Lite model for blood group detection
   - `react-native-reanimated` - worklets for smooth animations
   - `react-native-worklets` - worklet runtime

3. **Build Performance**:
   - Gradle caching
   - Disabled unnecessary optimizations for development builds
   - Proper asset handling for `.tflite` model files

## Troubleshooting

If the build still fails:

1. **Check the EAS build logs** at the URL provided in the build output
2. **Look for specific error messages** in the "Fix gradlew build phase" section
3. **Common issues**:
   - NDK version mismatch - EAS uses the correct NDK automatically
   - Memory issues - already handled with `org.gradle.jvmargs=-Xmx2048m`
   - Duplicate native libraries - handled with `packagingOptions.pickFirsts`

## Next Steps After Successful Build

1. Download the APK from the EAS build page
2. Install on your Android device:
   ```bash
   adb install path/to/your-app.apk
   ```
3. Or share the download link from EAS dashboard for testing

## Important Notes

- **Development builds** include the Expo dev client for easier debugging
- **Preview builds** are optimized but still allow for testing
- **Production builds** are fully optimized and ready for release
- All builds use the `newArchEnabled=true` setting for React Native's new architecture
- Camera permissions are properly configured in `AndroidManifest.xml`
- TFLite model is bundled as an asset in the APK
