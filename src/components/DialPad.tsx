import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { dialPadStyles, Colors } from '../styles';

interface DialPadProps {
  onPress: (digit: string) => void;
  onLongPressZero?: () => void;
}

interface DialButton {
  digit: string;
  letters?: string;
}

const DIAL_BUTTONS: DialButton[][] = [
  [
    { digit: '1', letters: '' },
    { digit: '2', letters: 'ABC' },
    { digit: '3', letters: 'DEF' },
  ],
  [
    { digit: '4', letters: 'GHI' },
    { digit: '5', letters: 'JKL' },
    { digit: '6', letters: 'MNO' },
  ],
  [
    { digit: '7', letters: 'PQRS' },
    { digit: '8', letters: 'TUV' },
    { digit: '9', letters: 'WXYZ' },
  ],
  [
    { digit: '*', letters: '' },
    { digit: '0', letters: '+' },
    { digit: '#', letters: '' },
  ],
];

/**
 * Individual dial button with liquid glass effect
 */
const DialButton: React.FC<{
  button: DialButton;
  onPress: (digit: string) => void;
  onLongPress?: () => void;
}> = ({ button, onPress, onLongPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(button.digit)}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      delayLongPress={500}>
      <Animated.View
        style={[
          dialPadStyles.button,
          styles.buttonShadow,
          { transform: [{ scale: scaleAnim }] },
        ]}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.15)',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.02)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={dialPadStyles.buttonGradient}>
          <Animated.View
            style={[
              styles.pressOverlay,
              { opacity: opacityAnim },
            ]}
          />
          <View style={styles.buttonContent}>
            <Text style={dialPadStyles.buttonText}>{button.digit}</Text>
            {button.letters !== undefined && button.letters !== '' && (
              <Text style={dialPadStyles.buttonSubText}>{button.letters}</Text>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * DialPad component with liquid glass styled buttons
 */
const DialPad: React.FC<DialPadProps> = ({ onPress, onLongPressZero }) => {
  return (
    <View style={dialPadStyles.container}>
      {DIAL_BUTTONS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={dialPadStyles.row}>
          {row.map(button => (
            <DialButton
              key={button.digit}
              button={button}
              onPress={onPress}
              onLongPress={button.digit === '0' ? onLongPressZero : undefined}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
  pressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.glassHighlight,
    borderRadius: 40,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DialPad;
