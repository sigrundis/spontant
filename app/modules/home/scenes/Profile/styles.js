import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  buttonText: {
    color: color.white,
    fontSize: fontSize.regular + 2,
  },
  button: {
    backgroundColor: color.themeBlue,
    borderRadius: 5,
  },
});

export default styles;
