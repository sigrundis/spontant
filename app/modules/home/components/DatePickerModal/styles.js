import { StyleSheet } from 'react-native';
import { theme } from '../../index';
const { padding, color, fontSize } = theme;

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
    fontSize: fontSize.large,
    color: color.themeGreen,
    paddingTop: 0,
    textAlign: 'center',
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding,
  },
  cancelButton: {
    backgroundColor: color.themeBlue,
  },
  modalButton: {
    backgroundColor: color.themeOrange,
  },
});

export default styles;
