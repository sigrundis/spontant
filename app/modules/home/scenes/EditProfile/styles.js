import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  label: { backgroundColor: 'blue' },
  containerStyle: {
    borderColor: color.themeYellow,
  },
  inputContainer: { color: color.themeNight },
  button: {
    backgroundColor: color.themeRed,
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
  closeButton: {
    marginLeft: 'auto',
    padding: 10,
  },
});

export default styles;
