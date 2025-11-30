import React, { useRef, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { actionButtonStyles, Colors } from '../styles';

interface ActionButtonsProps {
  onCall: () => void;
  onDelete: () => void;
  onLongDelete: () => void;
  hasNumber: boolean;
}

/**
 * Call icon component
 */
const CallIcon: React.FC = () => (
  <View style={styles.callIconContainer}>
    <View style={styles.callIcon} />
  </View>
);

/**
 * Delete icon component (backspace)
 */
const DeleteIcon: React.FC = () => (
  <View style={styles.deleteIconContainer}>
    <View style={styles.deleteIcon}>
      <View style={styles.deleteIconArrow} />
      <View style={styles.deleteIconX}>
        <View style={[styles.deleteXLine, styles.deleteXLine1]} />
        <View style={[styles.deleteXLine, styles.deleteXLine2]} />
      </View>
    </View>
  </View>
);

/**
 * Action buttons component with call and delete buttons
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCall,
  onDelete,
  onLongDelete,
  hasNumber,
}) => {
  const callScaleAnim = useRef(new Animated.Value(1)).current;
  const deleteScaleAnim = useRef(new Animated.Value(1)).current;
  const deleteOpacityAnim = useRef(new Animated.Value(0)).current;

  const handleCallPressIn = useCallback(() => {
    Animated.spring(callScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
    }).start();
  }, [callScaleAnim]);

  const handleCallPressOut = useCallback(() => {
    Animated.spring(callScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  }, [callScaleAnim]);

  const handleDeletePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(deleteScaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.timing(deleteOpacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [deleteScaleAnim, deleteOpacityAnim]);

  const handleDeletePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(deleteScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.timing(deleteOpacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [deleteScaleAnim, deleteOpacityAnim]);

  return (
    <View style={actionButtonStyles.container}>
      {/* Spacer for centering */}
      <View style={actionButtonStyles.spacer} />

      {/* Call Button */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCall}
        onPressIn={handleCallPressIn}
        onPressOut={handleCallPressOut}>
        <Animated.View
          style={[
            actionButtonStyles.callButton,
            styles.callButtonShadow,
            { transform: [{ scale: callScaleAnim }] },
          ]}>
          <LinearGradient
            colors={[
              Colors.callButtonGradientStart,
              Colors.callButtonGradientEnd,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={actionButtonStyles.callButtonGradient}>
            <CallIcon />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* Delete Button */}
      {hasNumber ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onDelete}
          onLongPress={onLongDelete}
          onPressIn={handleDeletePressIn}
          onPressOut={handleDeletePressOut}
          delayLongPress={500}>
          <Animated.View
            style={[
              actionButtonStyles.deleteButton,
              styles.deleteButtonShadow,
              { transform: [{ scale: deleteScaleAnim }] },
            ]}>
            <Animated.View
              style={[
                styles.deleteOverlay,
                { opacity: deleteOpacityAnim },
              ]}
            />
            <DeleteIcon />
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View style={actionButtonStyles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  callButtonShadow: {
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
  deleteButtonShadow: {
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: 30,
  },
  callIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 6,
    transform: [{ rotate: '135deg' }],
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  deleteIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIconArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: Colors.textSecondary,
  },
  deleteIconX: {
    width: 16,
    height: 16,
    backgroundColor: Colors.textSecondary,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteXLine: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: Colors.backgroundPrimary,
  },
  deleteXLine1: {
    transform: [{ rotate: '45deg' }],
  },
  deleteXLine2: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default ActionButtons;
