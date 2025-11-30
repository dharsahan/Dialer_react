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
  IncomingCallScreen,
  CallingScreen,
} from './src/components';

// Screen types for navigation
type ScreenType = 'dialer' | 'calling' | 'incoming';

// Call status types
type CallStatus = 'calling' | 'ringing' | 'connected';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <MainApp />
    </SafeAreaProvider>
  );
}

/**
 * Main App component handling navigation between screens
 */
function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dialer');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [callStatus, setCallStatus] = useState<CallStatus>('calling');
  const [incomingCaller, setIncomingCaller] = useState({
    name: 'John Doe',
    number: '+1 (555) 123-4567',
  });

  // Handle starting a call
  const handleStartCall = useCallback((number: string) => {
    if (!number) {
      Alert.alert('No Number', 'Please enter a phone number to call.');
      return;
    }
    setCallStatus('calling');
    setCurrentScreen('calling');
    
    // Simulate call connection after 3 seconds
    setTimeout(() => {
      setCallStatus('ringing');
      setTimeout(() => {
        setCallStatus('connected');
      }, 2000);
    }, 1500);
  }, []);

  // Handle ending a call
  const handleEndCall = useCallback(() => {
    setCurrentScreen('dialer');
    setCallStatus('calling');
  }, []);

  // Handle answering incoming call
  const handleAnswerCall = useCallback(() => {
    setCallStatus('connected');
    setPhoneNumber(incomingCaller.number);
    setCurrentScreen('calling');
  }, [incomingCaller.number]);

  // Handle declining incoming call
  const handleDeclineCall = useCallback(() => {
    setCurrentScreen('dialer');
  }, []);

  // Simulate incoming call (for demo purposes)
  const simulateIncomingCall = useCallback(() => {
    setIncomingCaller({
      name: 'Jane Smith',
      number: '+1 (555) 987-6543',
    });
    setCurrentScreen('incoming');
  }, []);

  // Render the appropriate screen
  switch (currentScreen) {
    case 'incoming':
      return (
        <IncomingCallScreen
          callerName={incomingCaller.name}
          callerNumber={incomingCaller.number}
          onAnswer={handleAnswerCall}
          onDecline={handleDeclineCall}
        />
      );
    case 'calling':
      return (
        <CallingScreen
          contactName={incomingCaller.name || 'Unknown'}
          contactNumber={phoneNumber || incomingCaller.number}
          callStatus={callStatus}
          onEndCall={handleEndCall}
          onMuteToggle={(muted) => console.log('Mute:', muted)}
          onSpeakerToggle={(speaker) => console.log('Speaker:', speaker)}
          onKeypadPress={() => console.log('Keypad pressed')}
        />
      );
    default:
      return (
        <DialerScreen
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onCall={() => handleStartCall(phoneNumber)}
          onSimulateIncoming={simulateIncomingCall}
        />
      );
  }
}

/**
 * Dialer Screen Props
 */
interface DialerScreenProps {
  phoneNumber: string;
  setPhoneNumber: (value: string | ((prev: string) => string)) => void;
  onCall: () => void;
  onSimulateIncoming?: () => void;
}

/**
 * Main Dialer Screen component
 */
function DialerScreen({ phoneNumber, setPhoneNumber, onCall, onSimulateIncoming: _onSimulateIncoming }: DialerScreenProps) {
  // Handle digit press
  const handleDigitPress = useCallback((digit: string) => {
    setPhoneNumber((prev: string) => {
      // Limit phone number length to 15 digits
      if (prev.length >= 15) return prev;
      return prev + digit;
    });
  }, [setPhoneNumber]);

  // Handle long press on 0 to add +
  const handleLongPressZero = useCallback(() => {
    setPhoneNumber((prev: string) => {
      if (prev.length >= 15) return prev;
      return prev + '+';
    });
  }, [setPhoneNumber]);

  // Handle delete single digit
  const handleDelete = useCallback(() => {
    setPhoneNumber((prev: string) => prev.slice(0, -1));
  }, [setPhoneNumber]);

  // Handle long press delete to clear all
  const handleLongDelete = useCallback(() => {
    setPhoneNumber('');
  }, [setPhoneNumber]);

  // Handle call button press - now also opens system dialer
  const handleCall = useCallback(() => {
    if (!phoneNumber) {
      Alert.alert('No Number', 'Please enter a phone number to call.');
      return;
    }

    // Show the calling screen
    onCall();

    // Also try to open system dialer
    const phoneUrl = `tel:${phoneNumber}`;
    if (Platform.OS === 'android') {
      Linking.canOpenURL(phoneUrl)
        .then(supported => {
          if (supported) {
            return Linking.openURL(phoneUrl);
          }
        })
        .catch(err => {
          console.error('Error making call:', err);
        });
    } else {
      Linking.openURL(phoneUrl).catch(err => {
        console.error('Error making call:', err);
      });
    }
  }, [phoneNumber, onCall]);

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
