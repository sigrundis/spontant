import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const {
  padding,
  color,
  fontSize,
  fontFamily,
  yummo,
  windowWidth,
  normalize,
} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color.light_black,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 100,
    width: 100,
    // backgroundColor: color.grey,
    // marginBottom: padding,
    // resizeMode,
  },

  title: {
    fontSize: fontSize.large + 6,
    fontFamily: yummo.bold,
    color: color.themeOrange,
    letterSpacing: 1,
  },

  subText: {
    color: '#414141',
    fontSize: fontSize.large,
    lineHeight: fontSize.large + 10,
    marginVertical: padding * 2,
  },

  //===============================

  bottomContainer: {
    backgroundColor: 'white',
    paddingVertical: padding * 3,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerView: {
    width: windowWidth - 40,
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  button: {
    backgroundColor: color.themeOrange,
    height: normalize(55),
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: padding * 2,
  },

  bottomText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    marginRight: 5,
    color: '#414141',
  },

  signInText: {
    fontSize: fontSize.regular,
    color: color.themeOrange,
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
