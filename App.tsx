/**
 * React Native Dialer App with iOS 26-like Liquid Glass UI
 * A modern phone dialer with glassmorphism effects for Android
 *
 * @format
 */

import React, { useState, useCallback } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Display,
  DialPad,
  ActionButtons,
  GlassBackground,
} from './src/components';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <DialerScreen />
    </SafeAreaProvider>
  );
}

/**
 * Main Dialer Screen component
 */
function DialerScreen() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Handle digit press
  const handleDigitPress = useCallback((digit: string) => {
    setPhoneNumber(prev => {
      // Limit phone number length to 15 digits
      if (prev.length >= 15) return prev;
      return prev + digit;
    });
  }, []);

  // Handle long press on 0 to add +
  const handleLongPressZero = useCallback(() => {
    setPhoneNumber(prev => {
      if (prev.length >= 15) return prev;
      return prev + '+';
    });
  }, []);

  // Handle delete single digit
  const handleDelete = useCallback(() => {
    setPhoneNumber(prev => prev.slice(0, -1));
  }, []);

  // Handle long press delete to clear all
  const handleLongDelete = useCallback(() => {
    setPhoneNumber('');
  }, []);

  // Handle call button press
  const handleCall = useCallback(() => {
    if (!phoneNumber) {
      Alert.alert('No Number', 'Please enter a phone number to call.');
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;

    if (Platform.OS === 'android') {
      Linking.canOpenURL(phoneUrl)
        .then(supported => {
          if (supported) {
            return Linking.openURL(phoneUrl);
          } else {
            Alert.alert('Error', 'Phone calls are not supported on this device.');
          }
        })
        .catch(err => {
          console.error('Error making call:', err);
          Alert.alert('Error', 'Unable to make phone call.');
        });
    } else {
      // For iOS or other platforms
      Linking.openURL(phoneUrl).catch(err => {
        console.error('Error making call:', err);
        Alert.alert('Error', 'Unable to make phone call.');
      });
    }
  }, [phoneNumber]);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Display phoneNumber={phoneNumber} />
          <DialPad
            onPress={handleDigitPress}
            onLongPressZero={handleLongPressZero}
          />
          <ActionButtons
            onCall={handleCall}
            onDelete={handleDelete}
            onLongDelete={handleLongDelete}
            hasNumber={phoneNumber.length > 0}
          />
        </View>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
