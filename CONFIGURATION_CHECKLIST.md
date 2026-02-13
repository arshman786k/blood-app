# ✅ Configuration Checklist

Complete this checklist to ensure your app is fully configured and ready to run.

---

## 📋 **Pre-Setup Checklist**

- [ ] Node.js installed (v16+)
- [ ] npm or yarn installed
- [ ] Expo CLI installed (`npm install -g expo-cli`)
- [ ] Git installed (optional)
- [ ] Code editor ready (VS Code recommended)

---

## 🔥 **Firebase Configuration**

### Step 1: Create Project
- [ ] Went to [Firebase Console](https://console.firebase.google.com/)
- [ ] Created new project or selected existing
- [ ] Project created successfully

### Step 2: Enable Authentication
- [ ] Clicked "Authentication" in sidebar
- [ ] Clicked "Get started"
- [ ] Enabled "Email/Password" sign-in method
- [ ] Saved settings

### Step 3: Enable Firestore
- [ ] Clicked "Firestore Database" in sidebar
- [ ] Clicked "Create database"
- [ ] Selected "Start in production mode"
- [ ] Chose nearest location
- [ ] Database created successfully

### Step 4: Get Configuration
- [ ] Clicked ⚙️ Settings → Project settings
- [ ] Scrolled to "Your apps"
- [ ] Clicked Web icon (</>)
- [ ] Registered app with nickname
- [ ] Copied firebaseConfig object

### Step 5: Update App
- [ ] Opened `config/firebase.ts`
- [ ] Replaced `apiKey` with your API key
- [ ] Replaced `authDomain` with your auth domain
- [ ] Replaced `projectId` with your project ID
- [ ] Replaced `storageBucket` with your storage bucket
- [ ] Replaced `messagingSenderId` with your sender ID
- [ ] Replaced `appId` with your app ID
- [ ] Saved file

### Verification
- [ ] Firebase config file has no placeholder values
- [ ] All values start with real data (not "YOUR_...")

---

## ☁️ **Cloudinary Configuration**

### Step 1: Create Account
- [ ] Went to [Cloudinary](https://cloudinary.com/)
- [ ] Signed up (free tier)
- [ ] Verified email
- [ ] Logged into dashboard

### Step 2: Get Cloud Name
- [ ] Copied "Cloud name" from dashboard
- [ ] Wrote it down: ___________________

### Step 3: Create Upload Preset
- [ ] Went to Settings → Upload
- [ ] Scrolled to "Upload presets"
- [ ] Clicked "Add upload preset"
- [ ] **Set "Signing Mode" to "Unsigned"** ⚠️ IMPORTANT
- [ ] (Optional) Set folder name to "blood-tests"
- [ ] Clicked "Save"
- [ ] Copied preset name
- [ ] Wrote it down: ___________________

### Step 4: Update App
- [ ] Opened `services/cloudinaryService.ts`
- [ ] Replaced `YOUR_CLOUD_NAME` with actual cloud name
- [ ] Replaced `YOUR_UPLOAD_PRESET` with actual preset name
- [ ] Saved file

### Verification
- [ ] Cloud name is correct (no spaces)
- [ ] Upload preset is "Unsigned"
- [ ] No placeholder values remain

---

## 🖥️ **Flask Backend Configuration**

### Step 1: Find Your IP Address
**Windows:**
- [ ] Opened Command Prompt
- [ ] Ran `ipconfig`
- [ ] Found "IPv4 Address"
- [ ] Wrote it down: ___________________

**Mac/Linux:**
- [ ] Opened Terminal
- [ ] Ran `ifconfig`
- [ ] Found "inet" address
- [ ] Wrote it down: ___________________

### Step 2: Update Mobile App
- [ ] Opened `app/(tabs)/index.tsx`
- [ ] Found line: `const API_URL = ...`
- [ ] Replaced with: `http://YOUR_IP:5000/api/predict`
- [ ] Saved file

### Step 3: Verify Flask Server
- [ ] Flask server is running
- [ ] Can access from browser: `http://YOUR_IP:5000/api/health`
- [ ] No firewall blocking port 5000

### Verification
- [ ] IP address is correct
- [ ] Using port 5000
- [ ] Not using "localhost" or "127.0.0.1"
- [ ] Mobile device on same WiFi

---

## 📦 **Dependencies Installation**

### Step 1: Install Packages
- [ ] Opened terminal in project directory
- [ ] Ran `npm install`
- [ ] All packages installed successfully
- [ ] No critical errors

### Verification
- [ ] `node_modules` folder exists
- [ ] `package-lock.json` updated
- [ ] No error messages

---

## 👤 **Admin User Setup**

### Step 1: Create First User
- [ ] Started app: `npx expo start`
- [ ] Opened app on device
- [ ] Clicked "Sign Up"
- [ ] Entered your details:
  - Email: ___________________
  - Password: ___________________
- [ ] Signed up successfully

### Step 2: Promote to Admin
- [ ] Went to [Firebase Console](https://console.firebase.google.com/)
- [ ] Clicked "Firestore Database"
- [ ] Clicked "users" collection
- [ ] Found your user document
- [ ] Clicked on the document
- [ ] Found "role" field
- [ ] Changed value from `"user"` to `"admin"`
- [ ] Saved changes

### Step 3: Verify
- [ ] Restarted app
- [ ] Logged in
- [ ] Went to Profile tab
- [ ] Can see "Admin Dashboard" option
- [ ] See 👑 Admin badge

---

## 🧪 **Testing Checklist**

### Basic Features
- [ ] App starts successfully
- [ ] Splash screen shows
- [ ] Login screen appears
- [ ] Can sign up new user
- [ ] Can log in with email/password
- [ ] Home screen loads

### Blood Detection
- [ ] Can open camera
- [ ] Can upload from gallery
- [ ] Can upload all 3 images
- [ ] "Detect Blood Group" button works
- [ ] Loading indicator shows
- [ ] Result displays correctly
- [ ] Scores show correctly

### History & Profile
- [ ] Can view test history
- [ ] Images show from Cloudinary
- [ ] Can pull to refresh
- [ ] Profile shows user info
- [ ] Can log out
- [ ] Can log back in

### Admin Features (if admin)
- [ ] Can access admin dashboard
- [ ] Can see statistics
- [ ] Can view all users
- [ ] Can view user details
- [ ] Can see user's test history
- [ ] Images load in admin panel

### Firebase Data
- [ ] Tests saved in Firestore
- [ ] User data in Firestore
- [ ] Images uploaded to Cloudinary
- [ ] Cloudinary URLs in Firestore

---

## 🐛 **Common Issues**

### Issue: "Cannot connect to Flask"
- [ ] Flask server running?
- [ ] Using correct IP (not localhost)?
- [ ] Same WiFi network?
- [ ] Firewall disabled?
- [ ] Port 5000 not blocked?

### Issue: "Firebase error"
- [ ] Firebase config correct?
- [ ] Auth enabled?
- [ ] Firestore created?
- [ ] Internet connected?

### Issue: "Cloudinary upload fails"
- [ ] Upload preset is "Unsigned"?
- [ ] Cloud name correct?
- [ ] Internet connected?
- [ ] Images not too large?

### Issue: "App won't start"
- [ ] Dependencies installed?
- [ ] Expo CLI installed?
- [ ] No syntax errors?
- [ ] Tried `npx expo start -c`?

---

## 📝 **Final Verification**

### Configuration Files
- [ ] `config/firebase.ts` - Has real values
- [ ] `services/cloudinaryService.ts` - Has real values
- [ ] `app/(tabs)/index.tsx` - Has correct IP

### Accounts Created
- [ ] Firebase project exists
- [ ] Cloudinary account exists
- [ ] At least one admin user exists

### Services Working
- [ ] Firebase Auth working
- [ ] Firestore saving data
- [ ] Cloudinary uploading images
- [ ] Flask API responding

### App Features
- [ ] Authentication works
- [ ] Blood detection works
- [ ] History shows tests
- [ ] Profile displays info
- [ ] Admin panel accessible (for admin)

---

## 🎉 **Ready to Go!**

If you've checked all the boxes above, your app is **fully configured and ready for use!**

### Next Steps:
1. ✅ Test thoroughly on real device
2. ✅ Prepare demo presentation
3. ✅ Take screenshots for report
4. ✅ Document any customizations
5. ✅ Practice explaining the system

---

## 📚 **Quick Reference**

### Important Files
- Configuration: `config/firebase.ts`, `services/cloudinaryService.ts`
- Main Screen: `app/(tabs)/index.tsx`
- Auth Screens: `app/auth/`
- Admin Panel: `app/admin/`

### Useful Commands
```bash
# Start app
npx expo start

# Clear cache
npx expo start -c

# View logs
npx expo start --dev-client
```

### Important URLs
- Firebase Console: https://console.firebase.google.com/
- Cloudinary Dashboard: https://cloudinary.com/console
- Expo Documentation: https://docs.expo.dev/

---

## 🆘 **Still Need Help?**

Check these files in order:
1. `QUICKSTART.md` - Fast setup guide
2. `SETUP_GUIDE.md` - Detailed documentation
3. `IMPLEMENTATION_SUMMARY.md` - What was built
4. `FLASK_INTEGRATION.py` - Backend example

---

**Configuration Status:**

- [ ] Firebase: ✅ Configured
- [ ] Cloudinary: ✅ Configured
- [ ] Flask API: ✅ Configured
- [ ] Admin User: ✅ Created
- [ ] Testing: ✅ Passed

**READY FOR DEMO! 🚀**
