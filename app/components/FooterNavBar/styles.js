import { StyleSheet } from 'react-native';
import { theme } from '../../modules/home/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: theme.navbarHeight,
    paddingTop: 20,
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 0,
  },
  button: {},
});

export default styles;
