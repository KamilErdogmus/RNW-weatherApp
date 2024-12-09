# Weather App in React Native-Expo

## Description

A modern weather application built using React Native and Expo framework that provides real-time weather information with a clean and intuitive user interface. The app features current weather conditions, location-based updates, temperature displays, weather animations, and persistent data storage for offline access. This comprehensive weather app delivers a seamless weather checking experience across both mobile and web platforms. The application is designed to work flawlessly on both mobile devices (iOS and Android) and web browsers, maintaining consistent functionality and user experience across all platforms through React Native's cross-platform capabilities.

## Libraries and Tools

- **@expo/metro-runtime**:Metro bundler runtime for Expo applications, handles JavaScript bundling
- **@react-native-async-storage/async-storage**:Asynchronous, persistent, key-value storage system for React Native
- **axios**:Promise based HTTP client for making API requests in browser and Node.js
- **expo-status-bar**:Component for managing the status bar appearance in Expo apps
- **nativewind**:Brings Tailwind CSS to React Native, enabling utility-first styling
- **react-dom**:Entry point to the DOM and server renderers for React
- **react-native**:Framework for building native applications using React
- **react-native-dotenv**:Loads environment variables using import statements in React Native
- **react-native-progress**:Collection of progress indicators and spinners for React Native
- **react-native-reanimated**:Advanced animation library for React Native applications
- **react-native-safe-area-context**:Handles safe area insets for notches, status bars, and home indicators
- **react-native-web**:Enables running React Native components and APIs on the web
- **react-slick**:Carousel/slider component built with React
- **slick-carousel**:The last carousel you'll ever need, dependency for react-slick
- **tailwindcss**:Utility-first CSS framework for rapidly building custom designs

## Preview

<img src="assets/WeatherAppGIF.gif" height="500" />

## API

[Weather-API](https://www.weatherapi.com/)

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RNW-weatherApp.git
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
