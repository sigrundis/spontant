import { StyleSheet } from 'react-native';

import { theme } from '../../index';
const { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding,
  },

  errorText: {
    color: color.red,
    marginLeft: padding,
  },

  containerView: {
    marginVertical: padding * 3,
    width: windowWidth - padding * 4,
    marginLeft: padding,
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  button: {
    backgroundColor: color.themeOrange,
    borderRadius: 5,
    height: normalize(55),
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },

  forgotText: {
    color: color.themeOrange,
    marginBottom: padding,
    marginLeft: padding,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
  },
});

export default styles;
