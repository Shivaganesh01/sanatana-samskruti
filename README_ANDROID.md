# How to Build Android APK

This project is built as a Progressive Web App (PWA) using React + Vite. It is designed to be easily converted into a native Android app using **Capacitor**.

## Prerequisites

- Node.js installed.
- **Android Studio** installed and set up (with Android SDK).

## Steps to Generate Android Project

1. **Install Capacitor Dependencies** (if not already done):

   ```bash
   npm install @capacitor/core
   npm install -D @capacitor/cli @capacitor/android
   ```

2. **Initialize Capacitor**:

   ```bash
   npx cap init SanatanaSamskruti com.example.sanatana
   ```

3. **Build the Web App**:

   ```bash
   npm run build
   ```

4. **Add Android Platform**:

   ```bash
   npx cap add android
   ```

5. **Sync the Project**:

   ```bash
   npx cap sync
   ```

6. **Open in Android Studio**:

   ```bash
   npx cap open android
   ```

7. **Build APK**:
    - In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
    - The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Running Locally (Web)

To preview the app layout and content:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
Switch to **Mobile View** (F12 > Toggle Device Toolbar) for the best experience.
