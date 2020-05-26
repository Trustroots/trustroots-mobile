# Trustroots Mobile

Welcome to Trustroots' [React Native](https://github.com/facebook/react-native) client Proof-of-Concept.

The app is optimized for iOS and Android - one code, one love!

## 👩‍💻👨‍💻‍ Run / Compile it locally

Setup your React Native environment by following the ```React Native CLI Quickstart``` in React Native's [Getting started guide](https://facebook.github.io/react-native/docs/getting-started).

After cloning the project, install the dependencies and you are ready to go:
```bash
$> yarn

# then for iOS
$> cd ios
$> pod install
$> cd ..
$> react-native run-ios

# or for Android - make sure to have your emulator running or phone connected in developer mode
$> react-native run-android
```

To get an insight into the redux action flow, state and logs, use [react-native-debugger
](https://github.com/jhen0409/react-native-debugger) and activate the ```Debug``` mode via React Native's shaking menu.
