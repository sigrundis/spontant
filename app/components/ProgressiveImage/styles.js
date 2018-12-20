import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize } from '../../styles/theme';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

export default styles;
