import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../styles';

interface GlassBackgroundProps {
  children: React.ReactNode;
}

/**
 * Glass background component providing the liquid glass effect backdrop
 */
const GlassBackground: React.FC<GlassBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Base gradient background */}
      <LinearGradient
        colors={[Colors.backgroundPrimary, Colors.backgroundSecondary, Colors.backgroundPrimary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.baseGradient}
      />
      
      {/* Animated orbs for liquid effect */}
      <View style={styles.orbsContainer}>
        <View style={[styles.orb, styles.orb1]}>
          <LinearGradient
            colors={['rgba(120, 100, 255, 0.3)', 'rgba(120, 100, 255, 0)']}
            style={styles.orbGradient}
          />
        </View>
        <View style={[styles.orb, styles.orb2]}>
          <LinearGradient
            colors={['rgba(100, 200, 255, 0.25)', 'rgba(100, 200, 255, 0)']}
            style={styles.orbGradient}
          />
        </View>
        <View style={[styles.orb, styles.orb3]}>
          <LinearGradient
            colors={['rgba(180, 100, 255, 0.2)', 'rgba(180, 100, 255, 0)']}
            style={styles.orbGradient}
          />
        </View>
        <View style={[styles.orb, styles.orb4]}>
          <LinearGradient
            colors={['rgba(100, 255, 200, 0.15)', 'rgba(100, 255, 200, 0)']}
            style={styles.orbGradient}
          />
        </View>
      </View>

      {/* Noise overlay for texture */}
      <View style={styles.noiseOverlay} />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  baseGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  orbsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 1000,
    overflow: 'hidden',
  },
  orbGradient: {
    width: '100%',
    height: '100%',
  },
  orb1: {
    width: 300,
    height: 300,
    top: -50,
    left: -50,
  },
  orb2: {
    width: 250,
    height: 250,
    top: 100,
    right: -80,
  },
  orb3: {
    width: 200,
    height: 200,
    bottom: 200,
    left: -60,
  },
  orb4: {
    width: 350,
    height: 350,
    bottom: -100,
    right: -100,
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.02,
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        // Android doesn't support noise texture natively
      },
    }),
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default GlassBackground;
