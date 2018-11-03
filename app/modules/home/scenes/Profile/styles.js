import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { color, fontSize } = theme;

const styles = StyleSheet.create({
  buttonText: {
    color: color.white,
    fontSize: fontSize.regular + 2,
  },
  button: {
    backgroundColor: color.themeRed,
    borderRadius: 5,
  },
});

export default styles;
