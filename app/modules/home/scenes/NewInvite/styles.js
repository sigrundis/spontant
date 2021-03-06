import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: padding,
  },
  link: {
    padding,
    fontSize: fontSize.regular,
    color: color.themeOrange,
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
  dateSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: padding,
    paddingVertical: padding * 2,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: padding,
  },
  label: {
    fontSize: fontSize.regular,
    color: color.themeGreen,
  },
  buttonWrapper: {
    padding,
    borderTopWidth: 1,
    borderTopColor: color.grey,
  },
  button: {
    backgroundColor: color.themeOrange,
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
    color: color.themeOrange,
    fontSize: fontSize.regular + 2,
  },
  bottomContainer: {
    height: normalize(49),
  },
  numberController: {
    display: 'flex',
    padding,
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
});

export default styles;
