# How to Get the APK (No Android Studio)

Since you don't have Android Studio, the easiest way is to let **GitHub** build it for you in the cloud.

## Option 1: Cloud Build (GitHub Actions)

I have created a special file for this: `.github/workflows/android.yml`.

1. **Push to GitHub**:
    - Create a new repository on GitHub.
    - Push this code to that repository.

    *(If you need help with git commands, let me know!)*

2. **Wait for Build**:
    - Go to the **"Actions"** tab in your GitHub repository.
    - You will see a workflow running called "Build Android APK".
    - Wait for it to turn Green (Success).

3. **Download APK**:
    - Click on the successful run.
    - Scroll down to the **"Artifacts"** section.
    - Click on **"app-debug"** to download the zip file containing your APK.

## Option 2: Install as PWA (Current Best Option)

You don't actually *need* an APK to use this as an app! It is a **Progressive Web App**.

1. **Host the App** (e.g., on Vercel/Netlify for free).
2. **Open in Chrome on Android**.
3. Tap the **Examples menu (3 dots)** > **"Add to Home Screen"** or **"Install App"**.

This will install the app on your phone. It works offline, has an icon, and looks exactly like a native app.
