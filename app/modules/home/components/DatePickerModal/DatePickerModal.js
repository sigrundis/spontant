import React from 'react';
import {
  Text,
  Platform,
  View,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, Icon, FormLabel } from 'react-native-elements';
import styles from './styles';
import { theme } from '../../';
const { color } = theme;

class DatePickerModal extends React.Component {
  constructor() {
    super();
    this.state = { isModalVisible: false };
    this.onDisplayModal = this.onDisplayModal.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { isVisible } = props;
    return { isModalVisible: isVisible };
  }

  onDisplayModal() {
    this.setState({ isModalVisible: true });
  }

  onHideModal() {
    this.setState({ isModalVisible: false });
  }

  renderDatePicker() {
    const { onChangeDate, value } = this.props;
    return (
      <View>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS date={value} onDateChange={onChangeDate} />
        ) : (
          <DatePickerAndroid date={value} onDateChange={onChangeDate} />
        )}
      </View>
    );
  }

  renderModalCloseButton() {
    const { onCloseModal } = this.props;
    return (
      <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
        <Icon
          name={'md-close'}
          type="ionicon"
          color={color.themeNight}
          size={20}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { isModalVisible } = this.state;
    const { onCloseModal } = this.props;
    return (
      <Modal
        transparent={true}
        isVisible={isModalVisible}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
        onSwipe={onCloseModal}
        swipeDirection="down"
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
      >
        <View style={styles.modal}>
          {this.renderModalCloseButton()}
          <Text style={styles.modalTitle}>Select date</Text>
          {this.renderDatePicker()}
          <View style={styles.modalFooter}>
            <Button
              raised
              title="Cancel"
              borderRadius={10}
              containerViewStyle={styles.containerView}
              buttonStyle={styles.cancelButton}
              textStyle={styles.buttonText}
              onPress={onCloseModal}
            />
            <Button
              raised
              title="Confirm date"
              borderRadius={10}
              containerViewStyle={styles.containerView}
              buttonStyle={styles.modalButton}
              textStyle={styles.buttonText}
              onPress={onCloseModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default DatePickerModal;
