import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({
  container: {
    borderTopColor: color.grey,
    borderTopWidth: 1,
    paddingTop: 10,
  },

  text: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    color: color.themeNight,
    fontFamily: fontFamily.regular,
  },

  bottom: { flexDirection: 'row' },

  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 18,
    borderRadius: 10,
    padding: 6,
    backgroundColor: color.light_grey,
  },

  joined: {
    height: 6,
    borderRadius: 10,
  },

  avaibaleSpots: {
    height: 6,
    backgroundColor: color.light_grey,
    borderRadius: 10,
  },
});

export default styles;
