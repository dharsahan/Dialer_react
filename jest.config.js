module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-linear-gradient|@react-native-community/blur|react-native-vector-icons|react-native-haptic-feedback)/)',
  ],
  moduleNameMapper: {
    '^react-native-linear-gradient$': '<rootDir>/__mocks__/react-native-linear-gradient.js',
    '^@react-native-community/blur$': '<rootDir>/__mocks__/@react-native-community/blur.js',
  },
};
