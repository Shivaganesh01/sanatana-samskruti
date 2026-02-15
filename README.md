# Sanatana Samskruti & Bhagavad Gita App 🕉️

A comprehensive **Progressive Web App (PWA)** and **Android App** designed to bring the essence of Sanatana Dharma to the modern world. It features daily routines (Dinacharya), detailed Bhagavad Gita verses, festivals, and stotras in **Kannada**.

## 🌟 Features

### 1. Sanatana Samskruti

- **Dinacharya**: Daily rituals like Pratah Smarana (Waking Up), Snana (Holy Bath), and Bhojana Vidhi.
- **Utsava (Festivals)**: Deep significance of festivals like Ugadi, Diwali, and Makara Sankranti.
- **Stotras**: Powerful chants (Gayatri Mantra, Ganesha Shloka) with meanings.
- **Pooja**: Understanding the science behind rituals (Panchamruta, Deepa).

### 2. Srimad Bhagavad Gita

- **Verse-by-Verse**: Complete 18 chapters with detailed breakdown.
- **Deep Study**: Includes Sanskrit Shloka, Transliteration, Word Meanings, Translation, and Purport.

### 3. Modern Tech Stack

- **PWA**: Installable on any device (Android, iOS, Desktop) directly from the browser.
- **Offline Support**: Works without internet once installed.
- **Search**: Instant search for any topic or shloka.
- **Dark Mode**: Premium "Dharma" theme with Saffron accents.

---

## 🚀 Running Locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Shivaganesh01/sanatana-samskruti.git
    cd sanatana-samskruti
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run Dev Server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📲 How to Install (3 Ways)

### Option 1: Install as App (Easiest)

You don't need to download anything!

1. Open the [Live Website](https://shivaganesh01.github.io/sanatana-samskruti/).
2. Tap the **Browser Menu (3 dots)** > **"Add to Home Screen"** or **"Install App"**.
3. The app will appear on your phone screen and work offline.

### Option 2: Download APK (Android)

Get the native Android app file (`.apk`).

1. Go to the **[Actions Tab](https://github.com/Shivaganesh01/sanatana-samskruti/actions)** in this repository.
2. Click on the latest **"Build & Deploy App"** run.
3. Scroll down to **Artifacts** and download **"app-debug"**.
4. Extract and install the `.apk` on your phone.

### Option 3: Build Android App Manually

If you have **Android Studio** installed:

1. Run `npm run build`
2. Run `npx cap sync android`
3. Run `npx cap open android`
4. Build the APK from Android Studio menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Glassmorphism)
- **Mobile**: Capacitor (Native Android Layer)
- **CI/CD**: GitHub Actions (Auto-build APK & Deploy PWA)
- **Validation**: Zod (JSON Schema Validation)
