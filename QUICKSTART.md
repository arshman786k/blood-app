# 🚀 Quick Start Guide

## Get Your App Running in 10 Minutes!

### ✅ Prerequisites Installed?
- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

---

## 📱 **STEP 1: Install Dependencies** (2 minutes)

```bash
cd blood-group-app
npm install
```

✅ **Done!** All packages installed.

---

## 🔥 **STEP 2: Setup Firebase** (3 minutes)

### A. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" → Enter name → Create project

### B. Enable Authentication
1. Click "Authentication" in sidebar
2. Click "Get started"
3. Click "Email/Password" → Enable → Save

### C. Enable Firestore
1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Choose "Start in production mode" → Next
4. Select location → Enable

### D. Get Your Config
1. Click ⚙️ Settings → Project settings
2. Scroll to "Your apps" → Click Web icon (</>) 
3. Register app → Copy the config object

### E. Update Your App
Open `config/firebase.ts` and replace:

```typescript
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```

✅ **Done!** Firebase configured.

---

## ☁️ **STEP 3: Setup Cloudinary** (2 minutes)

### A. Create Account
1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up (free)

### B. Create Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. **Set "Signing Mode" to "Unsigned"** ⚠️
5. Click "Save"
6. Copy the preset name

### C. Get Your Cloud Name
1. Go to Dashboard
2. Copy "Cloud name" (shown at top)

### D. Update Your App
Open `services/cloudinaryService.ts` and replace:

```typescript
const CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: 'YOUR_CLOUD_NAME',      // e.g., 'demo'
  uploadPreset: 'YOUR_UPLOAD_PRESET', // e.g., 'ml_default'
};
```

✅ **Done!** Cloudinary configured.

---

## 🖥️ **STEP 4: Setup Flask Backend** (2 minutes)

### A. Find Your IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.12)

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" under your network adapter

### B. Update API URL
Open `app/(tabs)/index.tsx` (line 15) and update:

```typescript
const API_URL = "http://YOUR_IP:5000/api/predict"; 
// Example: "http://192.168.1.12:5000/api/predict"
```

### C. Run Your Flask Server
```bash
cd path/to/your/flask-backend
python app.py
```

✅ **Done!** Backend ready.

---

## ▶️ **STEP 5: Run the App!** (1 minute)

```bash
npx expo start
```

### Scan QR Code
- **Android:** Use Expo Go app
- **iOS:** Use Camera app
- **Browser:** Press `w` for web

✅ **Done!** App is running!

---

## 👤 **STEP 6: Create Admin User**

1. **Sign up** in the app with your email
2. Go to Firebase Console → Firestore Database
3. Click on `users` collection → Find your user document
4. Click on the document
5. Change `role` field from `"user"` to `"admin"`
6. Restart the app → You're now admin! 👑

---

## 🎉 **You're All Set!**

### Test the App:
1. ✅ Login/Signup works
2. ✅ Upload 3 blood test images
3. ✅ Get prediction from Flask
4. ✅ Images upload to Cloudinary
5. ✅ Results saved in Firebase
6. ✅ View history
7. ✅ Access admin panel (if admin)

---

## 🐛 **Troubleshooting**

### Problem: Can't connect to Flask
- ✅ Flask server running?
- ✅ Using correct IP (not localhost)?
- ✅ Phone and computer on same WiFi?
- ✅ Firewall disabled?

### Problem: Firebase errors
- ✅ Copied config correctly?
- ✅ Email/Password auth enabled?
- ✅ Firestore database created?

### Problem: Cloudinary upload fails
- ✅ Upload preset is "Unsigned"?
- ✅ Cloud name is correct?
- ✅ Preset name is correct?

### Problem: App won't start
```bash
# Clear cache and restart
npx expo start -c
```

---

## 📚 **Next Steps**

1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed documentation
2. Customize the UI to match your branding
3. Test all features thoroughly
4. Add Firebase Security Rules (see SETUP_GUIDE.md)
5. Prepare for demo/presentation

---

## 🆘 **Need Help?**

Check these files:
- `SETUP_GUIDE.md` - Comprehensive documentation
- `FLASK_INTEGRATION.py` - Backend integration example
- `.env.example` - Environment variables template

---

## ✨ **Features You Have Now:**

### User App
- 🔐 Authentication (Login/Signup)
- 📸 Blood group detection
- 📊 Test history with images
- 👤 User profile
- 🎨 Modern beautiful UI

### Admin Panel
- 📊 Dashboard with stats
- 👥 User management
- 🧪 View all tests
- 🔍 Detailed user views
- 🖼️ Image viewer

---

**Built with ❤️ for your Final Year Project**

Ready to impress! 🚀
