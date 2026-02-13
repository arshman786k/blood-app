# Blood Group Detection & Blood Bank Mobile App

A production-ready mobile application built with Expo (React Native) and Flask backend for AI-powered blood group detection using agglutination test analysis.

## 🎯 Features

### User Features
- ✅ **Firebase Authentication** (Email/Password)
- ✅ **Blood Group Detection** using ML model (Flask + TFLite)
- ✅ **Test History** with Cloudinary-hosted images
- ✅ **User Profile** with blood group tracking
- ✅ **Modern UI/UX** with medical theme

### Admin Features
- ✅ **Admin Dashboard** with statistics
- ✅ **User Management** - View all users
- ✅ **Test Management** - View all blood tests
- ✅ **User Detail View** with complete test history
- ✅ **Cloudinary Image Viewer**

## 🛠️ Tech Stack

### Frontend
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: Expo Router
- **Animations**: Lottie (optional)
- **UI**: Custom modern design

### Backend
- **API**: Flask (Python)
- **ML Model**: TensorFlow Lite
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Image Storage**: Cloudinary

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Expo CLI** (`npm install -g expo-cli`)
4. **Firebase Account** (free tier works)
5. **Cloudinary Account** (free tier works)
6. **Python 3.8+** (for Flask backend)

## 🚀 Setup Instructions

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
4. Enable **Firestore Database**:
   - Go to Firestore Database > Create Database
   - Start in production mode
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" and click Web icon
   - Copy the config object

6. Update `config/firebase.ts` with your credentials:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 2: Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. Go to Dashboard > Settings > Upload
3. Create an **unsigned upload preset**:
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Copy the preset name

4. Update `services/cloudinaryService.ts`:
```typescript
const CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: 'YOUR_CLOUD_NAME',
  uploadPreset: 'YOUR_UPLOAD_PRESET',
};
```

### Step 3: Install Dependencies

```bash
cd blood-group-app
npm install
```

### Step 4: Flask Backend Setup

Your existing Flask backend should have the following endpoints:

```python
@app.route('/api/predict', methods=['POST'])
def predict():
    # Receives: antiA, antiB, antiD images
    # Returns: {
    #   "blood_group": "B+",
    #   "scores": {
    #     "antiA": 0.98,
    #     "antiB": 0.04,
    #     "antiD": 0.34
    #   }
    # }
```

**Update Flask API URL** in `app/(tabs)/index.tsx`:
```typescript
const API_URL = "http://YOUR_IP:5000/api/predict";
```

### Step 5: Create First Admin User

1. Start the app: `npx expo start`
2. Sign up with your email
3. Manually update the user's role in Firestore:
   - Go to Firebase Console > Firestore Database
   - Find your user document in `users` collection
   - Change `role` field from `"user"` to `"admin"`

## 🏃‍♂️ Running the App

### Development Mode

```bash
# Start Expo development server
npx expo start

# Or specific platform
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Running Flask Backend

```bash
# Navigate to your Flask backend directory
cd path/to/flask-backend

# Install requirements
pip install -r requirements.txt

# Run Flask server
python app.py
```

**Important**: Make sure your mobile device and Flask server are on the same network!

## 📱 App Structure

```
blood-group-app/
├── app/
│   ├── index.tsx                 # Splash screen
│   ├── _layout.tsx               # Root layout with auth
│   ├── auth/
│   │   ├── login.tsx             # Login screen
│   │   └── signup.tsx            # Signup screen
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab navigation
│   │   └── index.tsx             # Home/Detection screen
│   ├── screens/
│   │   ├── history.tsx           # Test history
│   │   └── profile.tsx           # User profile
│   └── admin/
│       ├── dashboard.tsx         # Admin dashboard
│       ├── users.tsx             # All users list
│       └── user-detail.tsx       # User detail view
├── config/
│   └── firebase.ts               # Firebase config
├── services/
│   ├── authService.ts            # Authentication
│   ├── bloodTestService.ts       # Blood tests
│   ├── cloudinaryService.ts      # Image upload
│   └── adminService.ts           # Admin operations
└── store/
    └── authStore.ts              # Zustand auth state
```

## 🔑 Key Features Explained

### Blood Group Detection Flow

1. User captures/uploads 3 images (Anti-A, Anti-B, Anti-D)
2. Images sent to Flask API for ML prediction
3. Flask returns blood group and confidence scores
4. Images uploaded to Cloudinary
5. Results saved to Firestore with Cloudinary URLs
6. User can view history with all past tests

### Admin Dashboard

- View total users and tests
- Browse all users with their details
- View any user's complete test history
- See all uploaded images via Cloudinary URLs
- Role-based access control

### Authentication

- Email/password authentication via Firebase
- Persistent login with AsyncStorage
- Role-based routes (user/admin)
- Secure logout

## 🎨 UI/UX Features

- Modern medical theme (white + red accents)
- Rounded cards with shadows
- Loading states and animations
- Pull-to-refresh functionality
- Responsive design
- Clean, professional interface

## 🔒 Security Best Practices

1. **Never commit sensitive data**:
   - Add `.env` to `.gitignore`
   - Use environment variables
   
2. **Firebase Security Rules** (example):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Only user can read their tests
    match /blood_tests/{testId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
  }
}
```

3. **Cloudinary Security**:
   - Use unsigned presets for mobile uploads
   - Set folder restrictions
   - Enable auto-moderation if needed

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Auth Persistence Error**:
   - Make sure `@react-native-async-storage/async-storage` is installed
   - Clear app cache and restart

2. **Images Not Uploading to Cloudinary**:
   - Check your upload preset is "unsigned"
   - Verify CLOUD_NAME and UPLOAD_PRESET are correct
   - Check network connectivity

3. **Flask Connection Issues**:
   - Ensure Flask server is running
   - Use correct IP address (not localhost on mobile)
   - Check if devices are on same network
   - Disable firewall if needed

4. **Build Errors**:
   ```bash
   # Clear cache
   npx expo start -c
   
   # Reset project
   rm -rf node_modules
   npm install
   ```

## 📊 Firestore Data Structure

### Users Collection
```javascript
{
  uid: "firebase_uid",
  name: "John Doe",
  email: "john@example.com",
  role: "user" | "admin",
  bloodGroup: "B+",
  createdAt: timestamp
}
```

### Blood Tests Collection
```javascript
{
  userId: "firebase_uid",
  userName: "John Doe",
  userEmail: "john@example.com",
  bloodGroup: "B+",
  scores: {
    antiA: 0.98,
    antiB: 0.04,
    antiD: 0.34
  },
  images: {
    antiA: "cloudinary_url",
    antiB: "cloudinary_url",
    antiD: "cloudinary_url"
  },
  createdAt: timestamp
}
```

## 🚀 Deployment

### Building for Production

```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Pre-deployment Checklist

- [ ] Update Firebase config with production values
- [ ] Set up Cloudinary production environment
- [ ] Configure Flask backend for production
- [ ] Set up proper Firebase security rules
- [ ] Test all features thoroughly
- [ ] Update API URLs to production endpoints

## 📝 TODO / Future Enhancements

- [ ] Dark mode support
- [ ] PDF report generation
- [ ] Push notifications
- [ ] Multiple language support
- [ ] Blood donor/receiver matching
- [ ] Emergency blood request system
- [ ] Export test history as CSV/PDF

## 👥 Roles & Permissions

### User
- Can detect blood group
- View own test history
- Update profile

### Admin
- All user permissions
- View all users
- View all tests
- Access admin dashboard
- View any user's details

## 📄 License

This project is for educational/final year project purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Firebase/Cloudinary documentation
3. Check Expo documentation

## 🎓 Final Year Project Submission

This app is ready for:
- ✅ Final year project submission
- ✅ Live demo presentation
- ✅ Documentation and report
- ✅ Working prototype with all features

---

**Built with ❤️ using Expo, React Native, Firebase, and Flask**
