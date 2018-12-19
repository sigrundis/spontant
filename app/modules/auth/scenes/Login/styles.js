import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingVertical: padding * 2,
  },

  signInWithFacebookSection: {
    marginTop: padding,
    marginBottom: 2 * padding,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },

  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: windowWidth,
  },

  divider: {
    backgroundColor: '#D0D5DA',
    position: 'absolute',
    top: 19,
    left: 20,
    right: 20,
  },

  orText: {
    backgroundColor: color.white,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    color: '#414141',
    paddingHorizontal: padding,
  },
});

export default styles;
