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

  quote: {
    marginBottom: padding * 2,
    flexDirection: 'row',
  },

  text: {
    fontSize: normalize(17),
    lineHeight: normalize(21),
    color: color.white,
    letterSpacing: 0.5,
    fontFamily: fontFamily.medium,
    flex: 1,
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
    color: color.white,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },

  publishedAt: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    color: color.white,
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
});

export default styles;
