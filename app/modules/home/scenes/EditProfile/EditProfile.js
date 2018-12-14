import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, Icon } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { isEmpty } from '../../../auth/utils/validate';
import styles from './styles';
import { validateUpdatedUser } from '../../utils/validation';
import { actions as authActions } from '../../../auth';
const { updateUser } = authActions;
import { theme } from '../../';
const { color } = theme;
import InputField from '../../components/InputField';

const error = {};

const CLOUDINARY_NAME = 'dgbmwdqbl';
const CLOUDINARY_PRESET = 'face-crop';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      userImage: null,
      uploadingImage: false,
      error: error,
      isModalVisible: false,
      validationErrors: {
        displayName: [],
        email: [],
        phoneNumber: [],
        facebook: [],
        twitter: [],
        instagram: [],
      },
    };
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeFacebook = this.onChangeFacebook.bind(this);
    this.onChangeTwitter = this.onChangeTwitter.bind(this);
    this.onChangeInstagram = this.onChangeInstagram.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onDisplayModal = this.onDisplayModal.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.onPressSave = this.onPressSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { populatedDefaultState } = state;
    const { isFocused, user } = props;
    if (populatedDefaultState) return null;
    if (!isFocused)
      return {
        populatedDefaultState: false,
        validationErrors: {
          displayName: [],
          email: [],
          phoneNumber: [],
          facebook: [],
          twitter: [],
          instagram: [],
        },
      };
    const {
      displayname,
      email,
      userimage,
      phonenumber,
      facebook,
      twitter,
      instagram,
    } = user;

    return {
      populatedDefaultState: true,
      displayName: displayname,
      userImage: userimage,
      oldEmail: email,
      email,
      phoneNumber: phonenumber,
      facebook,
      twitter,
      instagram,
      password: '',
    };
  }

  pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    this.setState({ uploadingImage: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [60, 60],
      base64: true,
    });
    if (result.canceled) {
      this.setState({ uploadingImage: false });
    } else {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
      let data = {
        file: base64Img,
        upload_preset: CLOUDINARY_PRESET,
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (response) => {
          let data = await response.json();
          this.setState({ uploadingImage: false, userImage: data.secure_url });
        })
        .catch((err) => {
          console.error('Cloudinary error', err);
          this.setState({ uploadingImage: false });
        });
    }
  };

  onPressSave() {
    const {
      displayName,
      email,
      phoneNumber,
      facebook,
      twitter,
      instagram,
    } = this.state;
    this.setState({ error: {} });
    const validationErrors = validateUpdatedUser({
      displayName,
      email,
      phoneNumber,
      facebook,
      twitter,
      instagram,
    });
    if (!validationErrors.isEmpty) {
      this.setState({
        validationErrors,
      });
    } else {
      this.onDisplayModal();
    }
  }

  onSubmit() {
    const {
      displayName,
      userImage,
      email,
      phoneNumber,
      facebook,
      twitter,
      instagram,
      oldEmail,
      password,
    } = this.state;
    const { user, updateUser } = this.props;
    user['displayname'] = displayName;
    user['phonenumber'] = phoneNumber || '';
    user['email'] = email || '';
    user['facebook'] = facebook || '';
    user['twitter'] = twitter || '';
    user['instagram'] = instagram || '';
    user['userimage'] = userImage || '';

    updateUser(user, oldEmail, password, this.onSuccess, this.onError);
  }

  onSuccess = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  };

  onError(error) {
    let errObj = this.state.error;
    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }
    this.setState({ error: errObj });
  }

  onChangeDisplayName(displayName) {
    this.setState({ displayName });
  }

  onChangeEmail(email) {
    this.setState({ email });
  }

  onChangePhoneNumber(phoneNumber) {
    this.setState({ phoneNumber: phoneNumber.replace(/[^0-9]/g, '') });
  }

  onChangeFacebook(facebook) {
    this.setState({ facebook: facebook.toLowerCase() });
  }

  onChangeInstagram(instagram) {
    this.setState({ instagram: instagram.toLowerCase() });
  }

  onChangeTwitter(twitter) {
    this.setState({ twitter: twitter.toLowerCase() });
  }

  onChangePassword(password) {
    this.setState({ password });
  }

  onDisplayModal() {
    this.setState({ isModalVisible: true });
  }

  onHideModal() {
    this.setState({ isModalVisible: false });
  }

  getFields() {
    const {
      displayName,
      email,
      phoneNumber,
      facebook,
      instagram,
      twitter,
      validationErrors,
    } = this.state;
    return [
      {
        key: 'displayName',
        label: 'Name',
        placeholder: 'Display name',
        autoFocus: false,
        secureTextEntry: false,
        value: displayName,
        keyboardType: 'default',
        validationErrors: validationErrors.displayName,
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'Email',
        autoFocus: false,
        secureTextEntry: false,
        value: email,
        keyboardType: 'default',
        validationErrors: validationErrors.email,
      },
      {
        key: 'phoneNumber',
        label: 'Phone number',
        placeholder: 'Phone number',
        autoFocus: false,
        secureTextEntry: false,
        value: phoneNumber,
        keyboardType: 'numeric',
        validationErrors: validationErrors.phoneNumber,
      },
      {
        key: 'facebook',
        label: 'Facebook',
        placeholder: 'Facebook username',
        autoFocus: false,
        secureTextEntry: false,
        value: facebook,
        keyboardType: 'default',
        validationErrors: validationErrors.facebook,
      },
      {
        key: 'instagram',
        label: 'Instagram',
        placeholder: 'Instagram username',
        autoFocus: false,
        secureTextEntry: false,
        value: instagram,
        keyboardType: 'default',
        validationErrors: validationErrors.instagram,
      },
      {
        key: 'twitter',
        label: 'Twitter',
        placeholder: 'Twitter username',
        autoFocus: false,
        secureTextEntry: false,
        value: twitter,
        keyboardType: 'default',
        validationErrors: validationErrors.twitter,
      },
    ];
  }

  renderImage(uri) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
    );
  }

  renderUserImage() {
    const { user } = this.props;
    const { userimage } = user;
    const { uploadingImage, userImage } = this.state;
    if (uploadingImage) {
      return <ActivityIndicator size="large" color={color.themeGreen} />;
    }
    // Newly uploaded user image
    if (userImage) {
      return this.renderImage(userImage);
    }
    // User image from database
    if (userimage) {
      return this.renderImage(userimage);
    }
    return (
      <Icon name={'ios-contact'} type="ionicon" color={color.grey} size={100} />
    );
  }

  renderModalCloseButton() {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={this.onHideModal}>
        <Icon
          name={'md-close'}
          type="ionicon"
          color={color.themeNight}
          size={20}
        />
      </TouchableOpacity>
    );
  }

  renderModal() {
    const { password, error } = this.state;
    return (
      <Modal
        transparent={true}
        isVisible={this.state.isModalVisible}
        onBackButtonPress={this.onHideModal}
        onBackdropPress={this.onHideModal}
        onSwipe={this.onHideModal}
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
          <Text style={styles.modalTitle}>
            Please enter your password to confirm changes
          </Text>
          {error.general && (
            <View style={styles.modalErrorContainer}>
              <Text style={styles.modalError}>{error.general}</Text>
            </View>
          )}
          <InputField
            showLabel={true}
            label={'Password'}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder={'password'}
            autoFocus={true}
            onChangeText={this.onChangePassword}
            secureTextEntry={true}
            placeholderTextColor={color.grey}
            textInputStyle={{ padding: 0 }}
            inputContainerStyle={{ width: '100%' }}
            keyboardType={'default'}
            value={password}
          />
          <View style={styles.modalFooter}>
            <Button
              raised
              title="Cancel"
              borderRadius={10}
              containerViewStyle={styles.containerView}
              buttonStyle={styles.cancelButton}
              textStyle={styles.buttonText}
              onPress={this.onHideModal}
            />
            <Button
              raised
              title="Confirm changes"
              borderRadius={10}
              containerViewStyle={styles.containerView}
              buttonStyle={styles.modalButton}
              textStyle={styles.buttonText}
              onPress={this.onSubmit}
            />
          </View>
        </View>
      </Modal>
    );
  }

  renderInputs() {
    const onChangeText = {
      displayName: this.onChangeDisplayName,
      email: this.onChangeEmail,
      phoneNumber: this.onChangePhoneNumber,
      facebook: this.onChangeFacebook,
      instagram: this.onChangeInstagram,
      twitter: this.onChangeTwitter,
    };

    return (
      <View>
        {this.getFields().map((field) => {
          const {
            key,
            label,
            placeholder,
            autoFocus,
            secureTextEntry,
            value,
            keyboardType,
            multiline,
            validationErrors,
          } = field;

          return (
            <View key={key}>
              <InputField
                showLabel={true}
                label={label}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={onChangeText[key]}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputContainer}
                placeholderTextColor={color.grey}
                keyboardType={keyboardType}
                value={value}
                multiline={multiline}
                validationErrors={validationErrors || []}
              />
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        <ScrollView>
          {this.renderUserImage()}
          <Button
            title="Select new profile picture"
            onPress={this.pickImage}
            buttonStyle={styles.imageButton}
            textStyle={styles.imageButtonText}
          />
          {this.renderInputs()}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button
            raised
            title="Save changes"
            borderRadius={10}
            containerViewStyle={styles.containerView}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.onPressSave}
          />
        </View>
      </View>
    );
  }
}

EditProfile.defaultProps = {
  placeholderTextColor: 'grey',
};

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default withNavigationFocus(
  connect(
    mapStateToProps,
    { updateUser }
  )(EditProfile)
);
