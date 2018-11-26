import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color } = theme;

const styles = StyleSheet.create({
  container: { paddingHorizontal: padding },
  label: {
    alignSelf: 'flex-start',
    color: color.themeOrange,
    backgroundColor: color.white,
    padding,
    marginLeft: 5,
    marginBottom: -15,
    zIndex: 1,
  },
  textInput: {
    color: color.themeNight,
    paddingHorizontal: padding,
    paddingVertical: padding * 2,
    borderWidth: 1,
    borderColor: color.themeOrange,
    borderRadius: 5,
  },
  errorMessageContainer: {
    marginTop: 4,
    borderRadius: 4,
    padding: 4,
    backgroundColor: color.themeLightRed,
    flex: 1,
    alignSelf: 'flex-start',
  },
  errorMessage: {
    color: 'red',
  },
});

export default styles;
