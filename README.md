# 🩸 Blood Group Detection & Blood Bank Mobile App

**AI-Powered Blood Type Analysis System**

A production-ready mobile application for blood group detection using machine learning, built with Expo (React Native) and Flask backend.

[![Expo](https://img.shields.io/badge/Expo-54.0.29-blue.svg)](https://expo.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-orange.svg)](https://firebase.google.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Integrated-blue.svg)](https://cloudinary.com)

---

## 🎯 **Overview**

This mobile app uses AI/ML to detect blood groups from agglutination test images. It includes user authentication, test history, cloud storage, and a complete admin panel.

**Perfect for Final Year Projects!** ✅

---

## ✨ **Features**

### 👤 **User Features**
- ✅ Email/Password Authentication
- ✅ Blood Group Detection (Anti-A, Anti-B, Anti-D)
- ✅ Test History with Cloud Images
- ✅ User Profile Management
- ✅ Modern Medical-Themed UI

### 👨‍💼 **Admin Panel**
- ✅ Dashboard with Statistics
- ✅ User Management
- ✅ View All Blood Tests
- ✅ User Detail Views
- ✅ Cloudinary Image Viewer

### 🎨 **UI/UX**
- ✅ Beautiful Modern Design
- ✅ Loading Animations
- ✅ Pull-to-Refresh
- ✅ Card-based Layout
- ✅ Medical Color Scheme

---

## 🛠️ **Tech Stack**

### **Frontend**
- React Native + Expo
- TypeScript
- Zustand (State Management)
- Expo Router (Navigation)
- Firebase Auth
- Cloudinary SDK

### **Backend**
- Flask (Python)
- TensorFlow Lite
- Firebase Firestore
- Cloudinary API

---

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Configure Services**

#### Firebase
1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication & Firestore
3. Update `config/firebase.ts` with your credentials

#### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Create unsigned upload preset
3. Update `services/cloudinaryService.ts`

#### Flask Backend
1. Update API URL in `app/(tabs)/index.tsx`
2. Use your local IP (not localhost)

### **3. Run the App**
```bash
npx expo start
```

📖 **Detailed Setup:** See [QUICKSTART.md](./QUICKSTART.md)

---

## 📂 **Project Structure**

```
blood-group-app/
├── app/
│   ├── index.tsx              # Splash screen
│   ├── auth/                  # Login & Signup
│   ├── (tabs)/                # Main app tabs
│   ├── screens/               # History & Profile
│   └── admin/                 # Admin panel
├── config/
│   └── firebase.ts            # Firebase setup
├── services/
│   ├── authService.ts         # Authentication
│   ├── bloodTestService.ts    # Blood tests
│   ├── cloudinaryService.ts   # Image uploads
│   └── adminService.ts        # Admin operations
└── store/
    └── authStore.ts           # Global state
```

---

## 🔑 **Key Workflows**

### **Blood Group Detection**
```
User uploads images → Flask ML prediction → 
Cloudinary upload → Firestore save → Display result
```

### **Authentication**
```
Firebase Auth → Persistent login → Role-based access
```

### **Admin Panel**
```
Admin dashboard → User list → User details → Test history
```

---

## 📊 **Database Schema**

### **Users Collection**
```javascript
{
  uid: string,
  name: string,
  email: string,
  role: "user" | "admin",
  bloodGroup?: string,
  createdAt: timestamp
}
```

### **Blood Tests Collection**
```javascript
{
  userId: string,
  bloodGroup: string,
  scores: { antiA, antiB, antiD },
  images: { antiA_url, antiB_url, antiD_url },
  createdAt: timestamp
}
```

---

## 🔒 **Security**

- Firebase Authentication
- Role-based access control
- Secure image storage (Cloudinary)
- Environment variables
- Firebase Security Rules

---

## 📱 **Screenshots**

### User App
- 🔐 Login/Signup screens
- 📸 Blood detection interface
- 📊 Test history with images
- 👤 User profile

### Admin Panel
- 📊 Dashboard statistics
- 👥 User management
- 🧪 Test records viewer
- 🖼️ Image gallery

---

## 🐛 **Troubleshooting**

**Flask Connection Issues?**
- Use your local IP, not localhost
- Ensure same WiFi network
- Check firewall settings

**Firebase Errors?**
- Verify config is correct
- Enable Auth & Firestore
- Check API keys

**Cloudinary Upload Fails?**
- Use "unsigned" preset
- Verify cloud name
- Check internet connection

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed solutions.

---

## 📚 **Documentation**

- [QUICKSTART.md](./QUICKSTART.md) - Get running in 10 minutes
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Comprehensive setup
- [FLASK_INTEGRATION.py](./FLASK_INTEGRATION.py) - Backend example

---

## 🎓 **For Final Year Projects**

This app includes:
- ✅ Complete documentation
- ✅ Production-ready code
- ✅ Modern UI/UX
- ✅ Admin panel
- ✅ Cloud integration
- ✅ ML integration
- ✅ Security implementation

**Ready for submission and demo!**

---

## 🔄 **Future Enhancements**

- [ ] Dark mode
- [ ] PDF report generation
- [ ] Push notifications
- [ ] Blood donor matching
- [ ] Multiple languages
- [ ] Emergency requests

---

## 📦 **Dependencies**

### Frontend
- expo ~54.0.29
- firebase ^latest
- zustand ^latest
- lottie-react-native ^latest
- axios ^latest
- @react-native-async-storage/async-storage

### Backend
- Flask
- TensorFlow Lite
- cloudinary
- firebase-admin

---

## 🤝 **Contributing**

This is a final year project. Feel free to fork and enhance!

---

## 📄 **License**

Educational/Final Year Project

---

## 🆘 **Support**

Need help? Check:
1. [QUICKSTART.md](./QUICKSTART.md)
2. [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. Firebase Documentation
4. Expo Documentation

---

## 🏆 **Credits**

Built with:
- [Expo](https://expo.dev)
- [Firebase](https://firebase.google.com)
- [Cloudinary](https://cloudinary.com)
- [Flask](https://flask.palletsprojects.com)

---

**Made with ❤️ for Blood Group Detection**

*Saving lives with technology* 🩸
