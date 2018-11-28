import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -22,
    borderTopColor: color.grey,
    borderTopWidth: 1,
  },

  wrapper: {
    paddingHorizontal: 22,
    paddingTop: 0,
  },

  text: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    color: color.themeNight,
    fontFamily: fontFamily.regular,
    paddingVertical: padding,
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

  loadingAttendees: { paddingVertical: padding + 5 },

  activationMessage: {
    display: 'flex',
    alignSelf: 'flex-start',
    backgroundColor: color.themeLightYellow,
    borderRadius: 4,
    marginTop: padding,
  },

  activationText: { flexShrink: 1, color: color.themeOrange, padding: 4 },

  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: padding / 2,
  },

  imageIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.white,
    backgroundColor: color.white,
  },

  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: color.white,
  },
});

export default styles;
