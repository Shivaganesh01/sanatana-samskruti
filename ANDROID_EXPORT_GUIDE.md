# Android Build & Export Instructions

The project has been converted to a native Android project using Capacitor.

## Automated Build (Currently Running)

I have triggered the build process in the background. If successful, the APK file will be located at:
`c:\Users\shiva\OneDrive\Documents\sanatana-samskruti\android\app\build\outputs\apk\debug\app-debug.apk`

## Manual Build (If automated build fails or takes too long)

1.Open the project in Android Studio:

- Launch Android Studio.
- Select **Open an existing project**.
- Navigate to `c:\Users\shiva\OneDrive\Documents\sanatana-samskruti\android`.
- Click **OK**.

1. Build the APK:
   - Let Gradle sync (bottom right progress bar).
   - Go to top menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
   - Once done, click "locate" in the notification to find the `.apk` file.

2. Install on Phone:
   - Transfer the `.apk` file to your Android phone via USB/WhatsApp/Drive.
   - Tap to install (Enable "Install from Unknown Sources" if prompted).

## Troubleshooting

- If build fails due to Java version, ensure JDK 17 is selected in Android Studio (File > Project Structure > SDK Location > Gradle Settings).
