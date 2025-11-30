# React Native Dialer App with Liquid Glass UI

A modern phone dialer application built with React Native featuring an iOS 26-like liquid glass (glassmorphism) UI design for Android devices.

## Features

- 🌟 **Liquid Glass UI**: Beautiful glassmorphism design inspired by iOS 26
- 📱 **Full Dial Pad**: Complete numeric dial pad with letter hints
- ✨ **Smooth Animations**: Press animations with scale and opacity effects
- 📞 **Real Phone Integration**: Make actual phone calls via system dialer
- 🎨 **Gradient Effects**: Multiple layered gradients for depth
- 🔢 **Smart Number Formatting**: Auto-formats phone numbers as you type
- ⌫ **Easy Delete**: Single tap to delete, long press to clear all
- ➕ **Plus Sign Support**: Long press 0 to add '+' for international calls

## Screenshots

The app features a dark glassmorphism theme with:
- Translucent number display with gradient overlays
- Circular dial buttons with glass effect
- Green call button with glow effect
- Subtle colored orbs in the background for depth

## Prerequisites

- Node.js >= 20
- React Native CLI
- Android Studio (for Android development)
- JDK 17 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dharsahan/Dialer_react.git
cd Dialer_react
```

2. Install dependencies:
```bash
npm install
```

3. Start Metro bundler:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

## Project Structure

```
├── App.tsx                    # Main application component
├── src/
│   ├── components/
│   │   ├── Display.tsx        # Phone number display
│   │   ├── DialPad.tsx        # Numeric dial pad
│   │   ├── ActionButtons.tsx  # Call and delete buttons
│   │   ├── GlassBackground.tsx # Liquid glass background
│   │   └── index.ts           # Component exports
│   └── styles/
│       ├── colors.ts          # Color palette
│       ├── styles.ts          # Component styles
│       └── index.ts           # Style exports
├── android/                   # Android native code
├── ios/                       # iOS native code
├── package.json
└── README.md
```

## Dependencies

- **react-native** - Core framework
- **react-native-linear-gradient** - Gradient effects
- **@react-native-community/blur** - Blur effects
- **react-native-safe-area-context** - Safe area handling
- **react-native-haptic-feedback** - Haptic feedback (optional)

## Design Inspiration

The UI is inspired by Apple's iOS 26 liquid glass design language, featuring:
- Translucent surfaces with depth
- Subtle blur and gradient effects
- Smooth animations and transitions
- Dark theme with accent colors

## Usage

1. **Dial a number**: Tap the dial pad buttons to enter a phone number
2. **Delete digits**: Tap the backspace button to delete the last digit
3. **Clear all**: Long press the backspace button to clear the entire number
4. **Make a call**: Tap the green call button to initiate a phone call
5. **International calls**: Long press '0' to add '+' for international dialing

## Customization

### Colors
Edit `src/styles/colors.ts` to customize the color scheme:
- Background colors
- Glass effect colors
- Gradient colors
- Button colors

### Styles
Edit `src/styles/styles.ts` to modify:
- Button sizes
- Border radius
- Spacing
- Font sizes

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```sh
bundle install
bundle exec pod install
```

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

## Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## License

MIT License - feel free to use this project as a starting point for your own dialer app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
