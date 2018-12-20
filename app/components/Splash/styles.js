import { StyleSheet } from 'react-native';

import { color, yummo, padding, fontSize } from '../../styles/theme';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },

  wrapper: {
    paddingHorizontal: 15,
    paddingBottom: padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 100,
    width: 100,
    backgroundColor: color.grey,
    marginBottom: padding,
    resizeMode,
  },

  title: {
    fontSize: fontSize.large + 6,
    fontFamily: yummo.bold,
    color: color.themeOrange,
    letterSpacing: 1,
  },

  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    height: 50,
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default styles;
