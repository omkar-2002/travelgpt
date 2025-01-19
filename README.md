# Travel GPT 🌎

A React Native chat application featuring text and voice messaging with a travel assistant interface. Users can interact through text messages or voice recordings to get travel-related information.

## Features 🚀

- Text & Voice Messaging
- Voice Recording with Playback
- Persistent Chat History (Redux)
- Travel Categories
- Custom Animations (Lottie)
- Cross-platform (iOS & Android)

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions before proceeding.

### Prerequisites

- Node.js >= 14
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)
- JDK 11

### Installation

```bash
# Clone the repo
git clone [repository-url]
cd travel-gpt

# Install dependencies
npm install
# OR
yarn install

# For iOS, install pods
cd ios && pod install && cd ..

Step 1: Start Metro Server
First, start Metro, the JavaScript bundler that ships with React Native.
bashCopy# using npm
npm start

# OR using Yarn
yarn start
Step 2: Start Application
Let Metro Bundler run in its own terminal. Open a new terminal from the root of your project. Run the following command to start your Android or iOS app:
For Android
bashCopy# using npm
npm run android

# OR using Yarn
yarn android
For iOS
bashCopy# using npm
npm run ios

# OR using Yarn
yarn ios
Building Debug APK
bashCopycd android
./gradlew assembleDebug
APK location: android/app/build/outputs/apk/debug/app-debug.apk
Project Structure 📁
Copytravel-gpt/
├── src/
│   ├── components/     # Reusable components
│   ├── constants/      # App constants
│   ├── store/         # Redux store
│   ├── hooks/         # Custom hooks
│   └── assets/        # Assets & animations
├── android/
└── ios/
Dependencies 📦

react-native
react-native-audio-recorder-player
react-native-vector-icons
@reduxjs/toolkit
redux-persist
lottie-react-native
rn-fetch-blob

Required Permissions 🔒

Microphone
Storage (Android)

Troubleshooting
If you can't get this to work, try these steps:

Clear watchman: watchman watch-del-all
Delete node_modules: rm -rf node_modules && npm install
Clear Metro cache: npm start -- --reset-cache
Android specific: cd android && ./gradlew clean
iOS specific: cd ios && pod deintegrate && pod install

Learn More
To learn more about React Native, check out these resources:

React Native Website
Getting Started Guide
Learn the Basics

Notes 📝

Chat history persists across restarts
Voice messages stored locally
Admin responses are simulated [dummy messages]
```
