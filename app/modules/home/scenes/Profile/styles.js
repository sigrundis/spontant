import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { color, fontSize, padding } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: padding,
  },
  wrapper: {
    borderRadius: 5,
  },
  header: {
    backgroundColor: color.white,
    padding: padding,
    paddingVertical: padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
  },
  userInfo: {
    backgroundColor: color.white,
  },
  namecard: {
    backgroundColor: color.themeRed,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },
  infoLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
    padding: padding,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 5,
    color: color.themeNight,
  },
  detail: {
    color: color.themeNight,
    marginLeft: 'auto',
  },
  signOut: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    height: 40,
    borderTopWidth: 1,
    borderTopColor: color.grey,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
  },
  signOutText: { fontSize: fontSize.regular, color: color.themeRed },
  title: {
    fontSize: fontSize.large,
    color: color.themeNight,
  },
  subTitle: {
    fontSize: fontSize.regular,
    padding: padding,
    color: color.themeNight,
  },
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
