# Map Setup Guide

## Changes Made

### 1. Installed Dependencies
- Installed `react-native-maps` package using `npx expo install react-native-maps`

### 2. Updated map.tsx
- Added actual MapView component with interactive map
- Added markers for each blood center on the map
- Different colored markers:
  - 🔵 Blue for Hospitals
  - 🔴 Red for Blood Banks
- Interactive features:
  - Click on markers to zoom into location
  - Click on list items to focus on map marker
  - Shows user's current location
  - My Location button on map

### 3. Updated app.json
- Added Google Maps API configuration for both iOS and Android

## How to Get Google Maps API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for Maps API)

### Step 2: Enable APIs
1. Go to "APIs & Services" > "Library"
2. Enable the following APIs:
   - **Maps SDK for Android**
   - **Maps SDK for iOS**

### Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### Step 4: Restrict API Key (Recommended)
1. Click on your newly created API key
2. Under "Application restrictions":
   - For Android: Add your app's package name and SHA-1 certificate fingerprint
   - For iOS: Add your app's bundle identifier
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Maps SDK for Android" and "Maps SDK for iOS"
4. Save changes

### Step 5: Add API Key to Project
Replace `YOUR_GOOGLE_MAPS_API_KEY` in `app.json` with your actual API key:

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_ACTUAL_API_KEY_HERE"
    }
  }
},
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_ACTUAL_API_KEY_HERE"
  }
}
```

## Testing the Map

### For Development (Expo Go)
```bash
npx expo start
```
**Note**: Maps may not work perfectly in Expo Go. For full functionality, use:

### For Development Build
```bash
# Create development build
npx expo run:android
# or
npx expo run:ios
```

### For Production Build
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Features Implemented

✅ Interactive map centered on Pakistan
✅ Markers for all blood centers
✅ Color-coded markers (Hospitals vs Blood Banks)
✅ Click markers to view details
✅ Click list items to focus on map
✅ User location tracking
✅ City filtering affects both map and list
✅ Call and navigation buttons for each center

## Troubleshooting

### Map shows blank/gray screen
- Make sure you've added a valid Google Maps API key
- Check that Maps SDK is enabled in Google Cloud Console
- Verify API key restrictions match your app configuration

### Markers not showing
- Check console for any errors
- Verify BLOOD_CENTERS data has valid coordinates
- Ensure you're using a development build (not Expo Go)

### User location not showing
- Request location permissions in app
- Test on a real device (simulator may not have location)

## Next Steps (Optional Enhancements)

1. **Add Search Functionality**: Search blood centers by name or address
2. **Add Directions**: Integrate turn-by-turn navigation
3. **Add Clustering**: Group nearby markers at high zoom levels
4. **Real-time Data**: Fetch blood centers from an API
5. **Blood Availability**: Show which blood groups are available at each center
6. **User Reviews**: Allow users to rate and review centers

## Support

For issues with:
- **react-native-maps**: https://github.com/react-native-maps/react-native-maps
- **Google Maps API**: https://developers.google.com/maps/documentation
- **Expo**: https://docs.expo.dev/
