# UFFICIENT V1 - Complete Deployment Guide

## 🚀 DEPLOYMENT CHECKLIST FOR VERSION 1

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Git configured
- [ ] Vercel account created
- [ ] Firebase project created ("ufficient-app")
- [ ] Firebase Admin SDK key downloaded

---

## 📁 PROJECT STRUCTURE VERIFICATION
```
ufficient-platform/
├── apps/
│   ├── web/           # Landing Page (Next.js)
│   ├── admin/         # Admin Portal (Next.js)  
│   └── mobile/        # Mobile App (React Native/Expo)
├── packages/
│   ├── core/          # Shared utilities
│   └── ui/            # Shared components
└── configs/           # Configuration files
```

---

## 🌐 PART 1: LANDING PAGE DEPLOYMENT

### Step 1: Deploy to Vercel
```bash
cd apps/web
vercel --prod
```

### Step 2: Configure Environment Variables in Vercel Dashboard
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Step 3: Custom Domain (Optional)
- Add custom domain in Vercel settings
- Example: `www.ufficient.com`

---

## 🔐 PART 2: ADMIN PORTAL DEPLOYMENT

### Step 1: Deploy to Vercel
```bash
cd apps/admin
vercel --prod
```

### Step 2: Configure Environment Variables in Vercel Dashboard
**Authentication:**
- `JWT_SECRET` = `your-super-secret-jwt-key-here`
- `ADMIN_EMAIL` = `admin@ufficient.com`
- `ADMIN_PASSWORD` = `your-secure-admin-password`

**Firebase Admin SDK:**
- `FIREBASE_PROJECT_ID` = `ufficient-app`
- `FIREBASE_PRIVATE_KEY_ID` = `[from service account JSON]`
- `FIREBASE_PRIVATE_KEY` = `[from service account JSON - full key with \n]`
- `FIREBASE_CLIENT_EMAIL` = `firebase-adminsdk-fbsvc@ufficient-app.iam.gserviceaccount.com`
- `FIREBASE_CLIENT_ID` = `[from service account JSON]`
- `FIREBASE_CLIENT_CERT_URL` = `[from service account JSON]`

**Firebase Client Config:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Step 3: Custom Domain (Optional)
- Example: `admin.ufficient.com`

---

## 📱 PART 3: MOBILE APP DEPLOYMENT

### Step 1: Install Expo CLI
```bash
npm install -g @expo/cli
```

### Step 2: Build for iOS & Android
```bash
cd apps/mobile
expo build:ios
expo build:android
```

### Step 3: Submit to App Stores
- iOS: Upload to App Store Connect
- Android: Upload to Google Play Console

---

## 🔧 FIREBASE SETUP

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project: "ufficient-app"
3. Enable Authentication
4. Enable Firestore Database

### Step 2: Generate Service Account Key
1. Go to Project Settings > Service Accounts
2. Generate new private key
3. Download JSON file
4. Extract values for environment variables

### Step 3: Configure Authentication
1. Enable Email/Password authentication
2. Add authorized domains (your Vercel domains)

---

## 🌍 DEPLOYMENT COMMANDS

### One-Shot Deployment (From Root)
```bash
# Build all apps
npm run build

# Deploy web app
cd apps/web && vercel --prod

# Deploy admin app  
cd ../admin && vercel --prod

# Build mobile app
cd ../mobile && expo build:ios && expo build:android
```

---

## 📋 ENVIRONMENT VARIABLES SUMMARY

### Web App (.env.production)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ufficient-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ufficient-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ufficient-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Admin App (.env.production)
```
# Authentication
JWT_SECRET=
ADMIN_EMAIL=admin@ufficient.com
ADMIN_PASSWORD=

# Firebase Admin SDK
FIREBASE_PROJECT_ID=ufficient-app
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@ufficient-app.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=
FIREBASE_CLIENT_CERT_URL=

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ufficient-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ufficient-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ufficient-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## ✅ POST-DEPLOYMENT TESTING

### Landing Page Tests
- [ ] Navigate to deployed URL
- [ ] Test contact form submission
- [ ] Verify responsive design
- [ ] Check all navigation links

### Admin Portal Tests
- [ ] Navigate to admin URL
- [ ] Test login with admin credentials
- [ ] Verify dashboard loads with metrics
- [ ] Test logout functionality
- [ ] Check all sidebar navigation

### Mobile App Tests
- [ ] Install from TestFlight/Play Console
- [ ] Complete onboarding flow
- [ ] Test task creation and completion
- [ ] Verify streak tracking

---

## 🔗 EXPECTED URLs

After deployment, you should have:
- **Landing Page**: `https://ufficient-web.vercel.app`
- **Admin Portal**: `https://ufficient-admin.vercel.app`
- **Mobile Apps**: Available in app stores

---

## 🛠 TROUBLESHOOTING

### Common Issues:
1. **Build Fails**: Check environment variables are set
2. **Firebase Errors**: Verify service account key format
3. **Login Issues**: Check JWT_SECRET and admin credentials
4. **Mobile Build Fails**: Ensure Expo CLI is latest version

### Support:
- Check Vercel deployment logs
- Verify Firebase project configuration
- Test environment variables locally first

---

## 🎯 SUCCESS CRITERIA

✅ **Version 1 is successfully deployed when:**
- Landing page loads and contact form works
- Admin can login and see dashboard metrics
- Mobile app installs and onboarding completes
- All three components can communicate with shared Firebase backend

**Ready for Version 1 Launch! 🚀**
