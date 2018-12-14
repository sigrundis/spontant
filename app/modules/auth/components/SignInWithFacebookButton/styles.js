import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({
  containerView: {
    width: windowWidth - 40,
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
});

export default styles;
