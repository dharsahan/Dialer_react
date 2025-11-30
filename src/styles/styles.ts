import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  safeArea: {
    flex: 1,
  },
  glassContainer: {
    backgroundColor: Colors.glassBackground,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 24,
    overflow: 'hidden',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
});

export const displayStyles = StyleSheet.create({
  container: {
    flex: 0.35,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  numberContainer: {
    backgroundColor: Colors.glassBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    minHeight: 100,
    justifyContent: 'center',
  },
  numberText: {
    fontSize: isSmallDevice ? 36 : 42,
    fontWeight: '200',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  placeholderText: {
    fontSize: isSmallDevice ? 18 : 20,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export const dialPadStyles = StyleSheet.create({
  container: {
    flex: 0.55,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: isSmallDevice ? 10 : 15,
  },
  button: {
    width: isSmallDevice ? 70 : 80,
    height: isSmallDevice ? 70 : 80,
    borderRadius: isSmallDevice ? 35 : 40,
    backgroundColor: Colors.dialPadButton,
    borderWidth: 1,
    borderColor: Colors.dialPadButtonBorder,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: Colors.dialPadButtonPressed,
    transform: [{ scale: 0.95 }],
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: isSmallDevice ? 35 : 40,
  },
  buttonText: {
    fontSize: isSmallDevice ? 28 : 32,
    fontWeight: '300',
    color: Colors.textPrimary,
  },
  buttonSubText: {
    fontSize: isSmallDevice ? 9 : 10,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginTop: 2,
  },
});

export const actionButtonStyles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  callButton: {
    width: isSmallDevice ? 60 : 70,
    height: isSmallDevice ? 60 : 70,
    borderRadius: isSmallDevice ? 30 : 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: isSmallDevice ? 30 : 35,
  },
  deleteButton: {
    width: isSmallDevice ? 50 : 60,
    height: isSmallDevice ? 50 : 60,
    borderRadius: isSmallDevice ? 25 : 30,
    backgroundColor: Colors.deleteButton,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  spacer: {
    width: isSmallDevice ? 50 : 60,
  },
});

export default {
  globalStyles,
  displayStyles,
  dialPadStyles,
  actionButtonStyles,
};
