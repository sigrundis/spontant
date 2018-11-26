import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: padding,
  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 180,
    width: '100%',
    padding: padding,
    borderBottomColor: color.light_grey,
    borderBottomWidth: 1,
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
  buttonWrapper: {
    paddingTop: padding,
    borderTopWidth: 1,
    borderTopColor: color.grey,
  },
  button: {
    backgroundColor: color.themeGreen,
    height: normalize(55),
  },
  imageButton: {
    backgroundColor: 'transparent',
    height: normalize(55),
  },
  buttonText: {
    color: color.white,
    fontSize: fontSize.regular + 2,
  },
  imageButtonText: {
    color: color.themeGreen,
    fontSize: fontSize.regular + 2,
  },
  bottomContainer: {
    height: normalize(49),
  },
  numberController: {
    display: 'flex',
  },
  numberControllerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberControllerButton: {
    backgroundColor: color.themeRed,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  numberControllerIconWrapper: { minWidth: 30 },
  numberControllerNumber: { textAlign: 'center', minWidth: 30 },
  checkBoxContainer: {
    backgroundColor: color.white,
    borderColor: color.white,
  },
  numberControllerButtonText: {
    color: color.white,
    fontSize: fontSize.large,
    paddingRight: 12,
    paddingBottom: 30,
  },
  color: {
    height: normalize(25),
    width: normalize(25),
    borderRadius: normalize(25 / 2),
    marginHorizontal: padding,
  },
});

export default styles;
