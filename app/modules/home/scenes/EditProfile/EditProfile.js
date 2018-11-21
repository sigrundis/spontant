import React from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
} from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isEmpty } from '../../../auth/utils/validate';
import styles from './styles';
import { actions as authActions } from '../../../auth';
const { updateUser } = authActions;
import { theme } from '../../';
const { color } = theme;

const error = {};

const CLOUDINARY_NAME = 'dgbmwdqbl';
const CLOUDINARY_PRESET = 'face-crop';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userImage: null,
      uploadingImage: false,
      error: error,
    };
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { isFocused, user } = props;
    if (!isFocused) return null;
    const {
      displayname,
      email,
      userimage,
      facebook,
      twitter,
      instagram,
    } = user;
    return {
      displayName: displayname,
      userImage: userimage,
      oldEmail: email,
      email,
      facebook,
      twitter,
      instagram,
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
    if (result.canseled) {
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

  onSubmit() {
    const {
      displayName,
      userImage,
      email,
      facebook,
      twitter,
      instagram,
      oldEmail,
    } = this.state;
    const { user } = this.props;
    user['displayname'] = displayName;
    user['email'] = email || '';
    user['facebook'] = facebook || '';
    user['twitter'] = twitter || '';
    user['instagram'] = instagram || '';
    user['userimage'] = userImage || '';
    this.setState({ error: error }); //clear out error messages
    this.props.updateUser(user, oldEmail, this.onSuccess, this.onError);
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

  onChangeFacebook(facebook) {
    this.setState({ facebook });
  }

  onChangeInstagram(instagram) {
    this.setState({ instagram });
  }

  onChangeTwitter(twitter) {
    this.setState({ twitter });
  }

  getFields() {
    const { displayName, email, facebook, instagram, twitter } = this.state;
    return [
      {
        key: 'displayName',
        label: 'Name',
        placeholder: 'Display name',
        autoFocus: false,
        secureTextEntry: false,
        value: displayName,
        keyboardType: 'default',
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'Email',
        autoFocus: false,
        secureTextEntry: false,
        value: facebook,
        keyboardType: 'default',
      },
      {
        key: 'facebook',
        label: 'Facebook',
        placeholder: 'Facebook username',
        autoFocus: false,
        secureTextEntry: false,
        value: facebook,
        keyboardType: 'default',
      },
      {
        key: 'instagram',
        label: 'Instagram',
        placeholder: 'Instagram username',
        autoFocus: false,
        secureTextEntry: false,
        value: facebook,
        keyboardType: 'default',
      },
      {
        key: 'twitter',
        label: 'Twitter',
        placeholder: 'Twitter username',
        autoFocus: false,
        secureTextEntry: false,
        value: facebook,
        keyboardType: 'default',
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
      return <ActivityIndicator size="large" color={color.themeRed} />;
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

  renderInputs() {
    const { error } = this.state;
    const onChangeText = {
      displayName: this.onChangeDisplayName,
      email: this.onChangeEmail,
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
          } = field;
          return (
            <View key={key}>
              <FormLabel style={styles.label}>{label}</FormLabel>
              <FormInput
                autoCapitalize="none"
                clearButtonMode="while-editing"
                underlineColorAndroid={'#fff'}
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
              />
              {!isEmpty(error) && (
                <FormValidationMessage>{error[key]}</FormValidationMessage>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderUserImage()}
        <Button
          title="Select new profile picture"
          onPress={this.pickImage}
          buttonStyle={styles.imageButton}
          textStyle={styles.imageButtonText}
        />
        {this.renderInputs()}
        <Button
          raised
          title="Save changes"
          borderRadius={10}
          containerViewStyle={styles.containerView}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this.onSubmit}
        />

        <View style={styles.bottomContainer} />
        <KeyboardSpacer />
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
