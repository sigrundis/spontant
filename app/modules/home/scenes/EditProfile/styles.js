import { StyleSheet } from 'react-native';
import { theme } from '../../index';
import { red, blue } from 'ansi-colors';
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingVertical: padding,
  },
  modal: {
    backgroundColor: 'white',

    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding,
    paddingTop: 0,
  },
  closeButton: {
    marginLeft: 'auto',
    marginTop: 5,
  },
  modalTitle: {
    fontSize: fontSize.regular,
    color: color.themeGreen,
    paddingTop: 0,
    fontWeight: 'bold',
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding,
  },
  modalErrorContainer: {
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 4,
    padding: 4,
    backgroundColor: color.themeLightRed,
  },
  modalError: { color: 'red' },
  button: {
    backgroundColor: color.themeGreen,
    height: normalize(55),
  },
  canselButton: {
    backgroundColor: color.themeBlue,
  },
  modalButton: {
    backgroundColor: color.themeOrange,
  },
  imageButton: {
    backgroundColor: 'transparent',
    height: normalize(55),
  },
  buttonText: {
    color: color.white,
    fontSize: fontSize.regular + 2,
  },
  imageButtonText: {
    color: color.themeGreen,
    fontSize: fontSize.regular + 2,
  },
  bottomContainer: {
    padding: padding,
  },
});

export default styles;
