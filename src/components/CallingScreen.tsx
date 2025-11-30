import React, { useRef, useState, useEffect } from 'react';
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
const ACTION_BUTTON_SIZE = 60;
const END_CALL_BUTTON_SIZE = 70;
const AVATAR_SIZE = 100;

interface CallingScreenProps {
  contactName: string;
  contactNumber: string;
  callStatus: 'calling' | 'ringing' | 'connected';
  callDuration?: number;
  onEndCall: () => void;
  onMuteToggle?: (muted: boolean) => void;
  onSpeakerToggle?: (speaker: boolean) => void;
  onKeypadPress?: () => void;
}

/**
 * Format call duration to mm:ss
 */
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Avatar component for calling screen
 */
const ContactAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.avatar}>
      <LinearGradient
        colors={['rgba(100, 200, 255, 0.4)', 'rgba(120, 100, 255, 0.2)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarGradient}>
        <Text style={styles.avatarText}>{initials}</Text>
      </LinearGradient>
    </View>
  );
};

/**
 * Action button component with glass effect
 */
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress: () => void;
}> = ({ icon, label, active = false, onPress }) => {
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
      <View style={styles.actionButtonContainer}>
        <Animated.View
          style={[
            styles.actionButton,
            active && styles.actionButtonActive,
            { transform: [{ scale: scaleAnim }] },
          ]}>
          <LinearGradient
            colors={
              active
                ? ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']
                : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}>
            {icon}
          </LinearGradient>
        </Animated.View>
        <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * End call button component
 */
const EndCallButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
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
          styles.endCallButton,
          { transform: [{ scale: scaleAnim }] },
        ]}>
        <LinearGradient
          colors={['rgba(255, 59, 48, 0.9)', 'rgba(200, 40, 40, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.endCallButtonGradient}>
          <View style={styles.endCallIcon}>
            <View style={styles.endCallIconBar} />
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Mute icon
 */
const MuteIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.micIcon, active && styles.iconActive]}>
      <View style={[styles.micBody, active && styles.micBodyActive]} />
      <View style={[styles.micBase, active && styles.micBaseActive]} />
    </View>
    {active && <View style={styles.muteSlash} />}
  </View>
);

/**
 * Speaker icon
 */
const SpeakerIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.speakerIcon, active && styles.iconActive]}>
      <View style={[styles.speakerBody, active && styles.speakerBodyActive]} />
      <View style={[styles.speakerWave1, active && styles.speakerWaveActive]} />
      <View style={[styles.speakerWave2, active && styles.speakerWaveActive]} />
    </View>
  </View>
);

/**
 * Keypad icon
 */
const KeypadIcon: React.FC = () => (
  <View style={styles.keypadContainer}>
    {[0, 1, 2].map(row => (
      <View key={row} style={styles.keypadRow}>
        {[0, 1, 2].map(col => (
          <View key={`${row}-${col}`} style={styles.keypadDot} />
        ))}
      </View>
    ))}
  </View>
);

/**
 * Calling screen with liquid glass UI
 */
const CallingScreen: React.FC<CallingScreenProps> = ({
  contactName,
  contactNumber,
  callStatus,
  callDuration = 0,
  onEndCall,
  onMuteToggle,
  onSpeakerToggle,
  onKeypadPress,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [duration, setDuration] = useState(callDuration);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Timer for call duration
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  // Pulse animation for calling status
  useEffect(() => {
    if (callStatus !== 'connected') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
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
    }
  }, [callStatus, pulseAnim]);

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    onMuteToggle?.(newMuted);
  };

  const handleSpeakerToggle = () => {
    const newSpeaker = !isSpeaker;
    setIsSpeaker(newSpeaker);
    onSpeakerToggle?.(newSpeaker);
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'calling':
        return 'Calling...';
      case 'ringing':
        return 'Ringing...';
      case 'connected':
        return formatDuration(duration);
      default:
        return '';
    }
  };

  return (
    <GlassBackground>
      <View style={styles.container}>
        {/* Contact Info Section */}
        <View style={styles.contactSection}>
          <ContactAvatar name={contactName} />
          <Text style={styles.contactName}>{contactName}</Text>
          <Text style={styles.contactNumber}>{contactNumber}</Text>
          <Animated.Text
            style={[
              styles.callStatus,
              callStatus !== 'connected' && { opacity: pulseAnim },
            ]}>
            {getStatusText()}
          </Animated.Text>
        </View>

        {/* Call Actions */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionsRow}>
            <ActionButton
              icon={<MuteIcon active={isMuted} />}
              label={isMuted ? 'Unmute' : 'Mute'}
              active={isMuted}
              onPress={handleMuteToggle}
            />
            <ActionButton
              icon={<KeypadIcon />}
              label="Keypad"
              onPress={onKeypadPress || (() => {})}
            />
            <ActionButton
              icon={<SpeakerIcon active={isSpeaker} />}
              label={isSpeaker ? 'Speaker Off' : 'Speaker'}
              active={isSpeaker}
              onPress={handleSpeakerToggle}
            />
          </View>
        </View>

        {/* End Call Button */}
        <View style={styles.endCallSection}>
          <EndCallButton onPress={onEndCall} />
          <Text style={styles.endCallLabel}>End Call</Text>
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
  contactSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.glassBorder,
    marginBottom: 20,
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
    fontSize: 36,
    fontWeight: '300',
    color: Colors.textPrimary,
  },
  contactName: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  contactNumber: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  callStatus: {
    fontSize: 18,
    color: Colors.callButton,
    fontWeight: '500',
  },
  actionsContainer: {
    paddingHorizontal: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  actionButtonContainer: {
    alignItems: 'center',
    width: 80,
  },
  actionButton: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
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
  actionButtonActive: {
    borderColor: 'transparent',
  },
  actionButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actionLabelActive: {
    color: Colors.textPrimary,
  },
  endCallSection: {
    alignItems: 'center',
  },
  endCallButton: {
    width: END_CALL_BUTTON_SIZE,
    height: END_CALL_BUTTON_SIZE,
    borderRadius: END_CALL_BUTTON_SIZE / 2,
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
  endCallButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
  endCallIconBar: {
    width: 28,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  endCallLabel: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  // Icon styles
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    alignItems: 'center',
  },
  micBody: {
    width: 12,
    height: 16,
    backgroundColor: Colors.textPrimary,
    borderRadius: 6,
  },
  micBodyActive: {
    backgroundColor: Colors.backgroundPrimary,
  },
  micBase: {
    width: 18,
    height: 3,
    backgroundColor: Colors.textPrimary,
    borderRadius: 2,
    marginTop: 2,
  },
  micBaseActive: {
    backgroundColor: Colors.backgroundPrimary,
  },
  iconActive: {
    // Active state styles
  },
  muteSlash: {
    position: 'absolute',
    width: 30,
    height: 2,
    backgroundColor: Colors.backgroundPrimary,
    transform: [{ rotate: '45deg' }],
  },
  speakerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerBody: {
    width: 8,
    height: 12,
    backgroundColor: Colors.textPrimary,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  speakerBodyActive: {
    backgroundColor: Colors.backgroundPrimary,
  },
  speakerWave1: {
    width: 4,
    height: 12,
    borderRightWidth: 2,
    borderColor: Colors.textPrimary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 2,
  },
  speakerWaveActive: {
    borderColor: Colors.backgroundPrimary,
  },
  speakerWave2: {
    width: 4,
    height: 18,
    borderRightWidth: 2,
    borderColor: Colors.textPrimary,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 1,
  },
  keypadContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  keypadDot: {
    width: 5,
    height: 5,
    backgroundColor: Colors.textPrimary,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default CallingScreen;
