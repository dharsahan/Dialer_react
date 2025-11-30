import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../styles';
import GlassBackground from './GlassBackground';

// Layout constants
const ANSWER_BUTTON_SIZE = 70;
const DECLINE_BUTTON_SIZE = 70;
const AVATAR_SIZE = 120;

interface IncomingCallScreenProps {
  callerName: string;
  callerNumber: string;
  onAnswer: () => void;
  onDecline: () => void;
}

/**
 * Avatar component with glass effect
 */
const CallerAvatar: React.FC<{ name: string }> = ({ name }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.avatarContainer}>
      <Animated.View
        style={[
          styles.avatarPulse,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.avatar}>
        <LinearGradient
          colors={['rgba(120, 100, 255, 0.4)', 'rgba(180, 100, 255, 0.2)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarGradient}>
          <Text style={styles.avatarText}>{initials}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

/**
 * Answer button component (green)
 */
const AnswerButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View style={styles.answerButtonContainer}>
        <Animated.View
          style={[
            styles.answerPulse,
            { transform: [{ scale: pulseAnim }], opacity: pulseAnim.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.5, 0],
            }) },
          ]}
        />
        <Animated.View
          style={[
            styles.answerButton,
            { transform: [{ scale: scaleAnim }] },
          ]}>
          <LinearGradient
            colors={[Colors.callButtonGradientStart, Colors.callButtonGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.answerButtonGradient}>
            <View style={styles.phoneIcon}>
              <View style={styles.phoneIconInner} />
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Decline button component (red)
 */
const DeclineButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.declineButton,
          { transform: [{ scale: scaleAnim }] },
        ]}>
        <LinearGradient
          colors={['rgba(255, 59, 48, 0.9)', 'rgba(200, 40, 40, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.declineButtonGradient}>
          <View style={styles.declineIcon}>
            <View style={styles.declineIconBar} />
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Incoming call screen with liquid glass UI
 */
const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  callerName,
  callerNumber,
  onAnswer,
  onDecline,
}) => {
  return (
    <GlassBackground>
      <View style={styles.container}>
        {/* Caller Info Section */}
        <View style={styles.callerSection}>
          <CallerAvatar name={callerName} />
          <Text style={styles.callerName}>{callerName}</Text>
          <Text style={styles.callerNumber}>{callerNumber}</Text>
          <Text style={styles.callStatus}>Incoming Call</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionButton}>
            <DeclineButton onPress={onDecline} />
            <Text style={styles.actionLabel}>Decline</Text>
          </View>
          <View style={styles.actionButton}>
            <AnswerButton onPress={onAnswer} />
            <Text style={styles.actionLabel}>Answer</Text>
          </View>
        </View>
      </View>
    </GlassBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  callerSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  avatarContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPulse: {
    position: 'absolute',
    width: AVATAR_SIZE + 40,
    height: AVATAR_SIZE + 40,
    borderRadius: (AVATAR_SIZE + 40) / 2,
    backgroundColor: 'rgba(120, 100, 255, 0.15)',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.glassBorder,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
    }),
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '300',
    color: Colors.textPrimary,
  },
  callerName: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  callerNumber: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  callStatus: {
    fontSize: 16,
    color: Colors.callButton,
    fontWeight: '500',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  answerButtonContainer: {
    width: ANSWER_BUTTON_SIZE,
    height: ANSWER_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerPulse: {
    position: 'absolute',
    width: ANSWER_BUTTON_SIZE + 30,
    height: ANSWER_BUTTON_SIZE + 30,
    borderRadius: (ANSWER_BUTTON_SIZE + 30) / 2,
    backgroundColor: Colors.callButton,
  },
  answerButton: {
    width: ANSWER_BUTTON_SIZE,
    height: ANSWER_BUTTON_SIZE,
    borderRadius: ANSWER_BUTTON_SIZE / 2,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 12,
      },
      ios: {
        shadowColor: Colors.callButton,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
    }),
  },
  answerButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIconInner: {
    width: 22,
    height: 22,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    transform: [{ rotate: '135deg' }],
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  declineButton: {
    width: DECLINE_BUTTON_SIZE,
    height: DECLINE_BUTTON_SIZE,
    borderRadius: DECLINE_BUTTON_SIZE / 2,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 12,
      },
      ios: {
        shadowColor: '#ff3b30',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
    }),
  },
  declineButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
  declineIconBar: {
    width: 26,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});

export default IncomingCallScreen;
