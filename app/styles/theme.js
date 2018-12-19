import { Dimensions, Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
  black: '#3B3031',
  light_black: '#414141',
  main: 'rgb(99,139,250)',
  white: '#ffffff',
  light_grey: '#eaeaea',
  grey: '#ccc',
  red: 'red',
  underlayColor: '#ddd',
  themeRed: '#f9595c',
  themeLightRed: '#fcb5b6',
  themeBlue: '#00BDD9',
  themeOcean: '#3ac9c2',
  themeYellow: '#fca45d',
  themeLightYellow: '#ffe4b5',
  themeLightOrange: '#fdd1b6',
  themeOrange: '#fa8d4a',
  themeNight: '#3f4c59',
  themeLightNight: '#5b7391',
  themeGreen: '#008489',
  themeBrightGreen: '#20C3B3',
  themeLightGreen: '#b2dadb',
};

const fontSize = {
  small: normalize(12),
  regular: normalize(14),
  large: normalize(21),
};

const yummo = {
  bold: 'YummoBold',
  light: 'YummoLight',
  regular: 'YummoRegular',
};

const fontFamily = {
  extrabold: 'RobotoExtraBold',
  bold: 'RobotoBold',
  medium: 'RobotoMedium',
  regular: 'RobotoRegular',
  light: 'RobotoLight',
};

const padding = 8;
const navbarHeight = Platform.OS === 'ios' ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor =
  Platform.OS === 'ios' ? 'rgba(73,75,76, .5)' : 'rgba(255,255,255,.8)';
const selectedTabColor = Platform.OS === 'ios' ? 'rgb(73,75,76)' : '#fff';

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor };
const navTitleStyle = {
  fontSize: fontSize.regular,
  fontFamily: fontFamily.extrabold,
  color: color.black,
};

export {
  color,
  fontSize,
  fontFamily,
  yummo,
  padding,
  navbarHeight,
  windowWidth,
  windowHeight,
  tabIconStyle,
  navTitleStyle,
  normalize,
};
