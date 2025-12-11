# Blood Group Detection App - Quick Start

## 🚀 Quick Start (Android)

```powershell
# Step 1: Build Android project (first time only)
npx expo prebuild --platform android

# Step 2: Run on Android device/emulator
npx expo run:android
```

## 📱 After First Build

Once you've built the app once, you can use the faster development workflow:

```powershell
# Terminal 1: Start Metro bundler
npx expo start --dev-client

# Terminal 2: Run on device (if needed)
npx expo run:android
```

## ✅ Your App is Now Ready!

All errors have been fixed:
- ✅ File structure organized (moved utils, logic, tflite to `src/`)
- ✅ Import paths corrected
- ✅ Native modules configured
- ✅ Metro config updated for .tflite files
- ✅ Camera permissions configured
- ✅ Development build ready

## 🎯 What's Next?

1. **Run the build command** above
2. **Grant camera permissions** when app opens
3. **Tap "Start Test"** on home screen
4. **Point camera** at blood test card
5. **Capture** and see results!

## 📝 Important Notes

- **Expo Go will NOT work** - native modules require development build
- First build takes 5-10 minutes
- Subsequent builds are much faster
- Make sure Android device is connected or emulator is running

## 🆘 Need Help?

See full documentation in `SETUP.md`
