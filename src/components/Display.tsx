import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { displayStyles, Colors } from '../styles';

interface DisplayProps {
  phoneNumber: string;
}

/**
 * Display component showing the dialed phone number
 * Features a liquid glass effect container
 */
const Display: React.FC<DisplayProps> = ({ phoneNumber }) => {
  // Format phone number for display (e.g., (123) 456-7890)
  const formatPhoneNumber = (number: string): string => {
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    
    if (!match) return number;
    
    if (match[1] && match[2] && match[3]) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    } else if (match[1] && match[2]) {
      return `(${match[1]}) ${match[2]}`;
    } else if (match[1]) {
      return match[1].length === 3 ? `(${match[1]})` : match[1];
    }
    return number;
  };

  return (
    <View style={displayStyles.container}>
      <View style={[displayStyles.numberContainer, styles.glassEffect]}>
        <LinearGradient
          colors={[
            Colors.gradientStart,
            Colors.gradientMiddle,
            Colors.gradientEnd,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientOverlay}
        />
        <View style={styles.contentContainer}>
          {phoneNumber ? (
            <Text
              style={displayStyles.numberText}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {formatPhoneNumber(phoneNumber)}
            </Text>
          ) : (
            <Text style={displayStyles.placeholderText}>
              Enter a phone number
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassEffect: {
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
    }),
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  contentContainer: {
    zIndex: 1,
  },
});

export default Display;
