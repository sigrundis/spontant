import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  formInput: {
    paddingTop: normalize(8 * 3),
    paddingBottom: normalize(8 * 3),
    paddingHorizontal: normalize(8 * 2),
    flex: 1,
    fontSize: normalize(17 + 3),
    lineHeight: normalize(21 + 3),
    color: color.themeRed,
    letterSpacing: 0.5,
    fontFamily: fontFamily.medium,
  },

  textInput: {
    paddingTop: normalize(8 * 3),
    paddingBottom: normalize(8 * 3),
    paddingHorizontal: normalize(8 * 2),
    flex: 1,
    fontSize: normalize(17 + 3),
    lineHeight: normalize(21 + 3),
    color: color.themeRed,
    letterSpacing: 0.5,
    fontFamily: fontFamily.medium,
  },

  button: {
    backgroundColor: color.themeRed,
    height: normalize(55),
  },

  buttonText: {
    color: color.white,
    fontSize: fontSize.regular + 2,
  },

  bottomContainer: {
    height: normalize(49),
  },

  closeButton: {
    // position: 'absolute',
    // top: 5,
    // right: 5,
    marginLeft: 'auto',
    padding: 10,
  },

  color: {
    height: normalize(25),
    width: normalize(25),
    borderRadius: normalize(25 / 2),
    marginHorizontal: padding,
  },
});

export default styles;
