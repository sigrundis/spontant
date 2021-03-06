import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },

  bottomContainer: {
    backgroundColor: 'white',
    paddingVertical: padding * 3,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityIndicator: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default styles;
