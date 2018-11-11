import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize } = theme;

const styles = StyleSheet.create({
  attendee: {
    flexDirection: 'row',
    backgroundColor: color.white,
    padding: padding,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
  },
  userInfo: {
    padding: padding,
  },
  displayName: {
    color: color.themeNight,
    fontSize: fontSize.regular,
  },
  username: {
    color: color.themeNight,
    fontSize: fontSize.small,
  },
});

export default styles;
