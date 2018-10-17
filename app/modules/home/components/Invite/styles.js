import { StyleSheet, Platform } from 'react-native';

import { theme } from '../../index';
const { padding, color, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
  container: {
    padding: padding,
    flex: 1,
  },

  wrapper: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: normalize(8 * 2.5),
    backgroundColor: '#fff',
    borderColor: '#fff',

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  invite: {
    marginTop: padding,
    marginBottom: padding,
    flexDirection: 'row',
  },

  title: {
    fontSize: normalize(17),
    lineHeight: normalize(21),
    letterSpacing: 0.5,
    fontFamily: fontFamily.medium,
    flex: 1,
    color: color.themeRed,
  },

  bottom: {
    flexDirection: 'row',
    marginTop: padding * 2,
    justifyContent: 'center',
  },

  left: {
    flex: 1,
    justifyContent: 'center',
  },

  author: {
    fontSize: normalize(14),
    lineHeight: normalize(19),
    color: color.themeNight,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },

  publishedAt: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    color: color.themeNight,
    fontFamily: fontFamily.regular,
  },

  description: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    color: color.themeNight,
    fontFamily: fontFamily.regular,
  },

  buttonContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    marginRight: -normalize(8 * 2.5),
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 34,
  },

  userImage: {
    marginLeft: -normalize(8 * 2.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: padding * 2,
    paddingRight: padding,
  },

  joinButton: {
    width: '100%',
    backgroundColor: color.themeBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  joinButtonSelected: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.themeBlue,
  },
});

export default styles;