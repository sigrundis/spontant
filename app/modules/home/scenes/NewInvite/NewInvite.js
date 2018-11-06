import React, { Component } from 'react';
import {
  ScrollView,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
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
import styles from './styles';
import { isEmpty } from '../../../auth/utils/validate';
import { actions as home, theme } from '../../index';
const { addInvite, updateInvite } = home;
const { color } = theme;
const error = {};

const CLOUDINARY_NAME = 'dgbmwdqbl';
const CLOUDINARY_PRESET = 'invite-images';

class NewInvite extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const {
      title,
      description,
      minAttendees,
      maxAttendees,
    } = navigation.getParam('invite', {});
    this.state = {
      title,
      date: new Date(),
      description,
      minAttendees,
      maxAttendees,
      error: error,
      image: null,
      uploadingImage: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMinAttendees = this.onChangeMinAttendees.bind(this);
    this.onChangeMaxAttendees = this.onChangeMaxAttendees.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { previousModeWasEdit } = state;
    const { isFocused, navigation } = props;
    if (!isFocused) return null;
    const edit = navigation.getParam('edit', false);
    // If the user was creating a new invite last time they were using the input fields
    // but didn't save, we want to keep their input, i.e. don't change the state.
    if (!previousModeWasEdit && !edit) return null;
    const invite = navigation.getParam('invite', {});
    const {
      title,
      date,
      description,
      minAttendees,
      maxAttendees,
      image,
    } = invite;
    return {
      previousModeWasEdit: edit,
      title,
      date: new Date(date) || new Date(),
      description,
      minAttendees,
      maxAttendees,
      image,
    };
  }

  onSubmit() {
    let { navigation } = this.props;
    const edit = navigation.getParam('edit', false);
    if (edit) this.editInvite();
    else this.saveInvite();
  }

  editInvite() {
    const { title, description, minAttendees, maxAttendees } = this.state;
    let { navigation } = this.props;
    const invite = navigation.getParam('invite', {});
    invite['title'] = title || invite['title'];
    invite['date'] = date || invite['date'];
    invite['description'] = description || invite['description'];
    invite['minAttendees'] = minAttendees || invite['minAttendees'];
    invite['maxAttendees'] = maxAttendees || invite['maxAttendees'];
    invite['image'] = image || invite['image'];
    this.props.updateInvite(invite, this.onSuccess, this.onError);
  }

  saveInvite() {
    const {
      title,
      date,
      description,
      minAttendees,
      maxAttendees,
      image,
    } = this.state;
    const { user } = this.props;

    const newInvite = {
      title: title,
      date: date,
      description: description,
      minAttendees: minAttendees,
      maxAttendees: maxAttendees,
      image,
      time: Date.now(),
      userId: user.uid,
      joinCount: 1,
      author: {
        username: user.username,
        name: user.displayname,
      },
      attendees: { [user.uid]: true },
    };
    this.props.addInvite(newInvite, this.onSuccess, this.onError);
  }

  onSuccess = () => {
    const { navigation } = this.props;
    this.setState(
      {
        title: null,
        date: new Date(),
        description: null,
        minAttendees: null,
        maxAttendees: null,
        image: null,
      },
      () => navigation.navigate('Home')
    );
  };

  pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    this.setState({ uploadingImage: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [80, 60],
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
          this.setState({ uploadingImage: false, image: data.secure_url });
        })
        .catch((err) => {
          console.error('Cloudinary error', err);
          this.setState({ uploadingImage: false });
        });
    }
  };

  onError(error) {
    alert(error.message);
  }

  onChangeTitle(title) {
    this.setState({ title });
  }

  onChangeDate(date) {
    this.setState({ date });
  }

  onChangeDescription(description) {
    this.setState({ description });
  }

  onChangeMinAttendees(minAttendees) {
    this.setState({ minAttendees });
  }

  onChangeMaxAttendees(maxAttendees) {
    this.setState({ maxAttendees });
  }

  getFields() {
    const { title, description, minAttendees, maxAttendees } = this.state;
    return [
      {
        key: 'title',
        label: 'Title',
        placeholder: 'Title',
        autoFocus: false,
        secureTextEntry: false,
        value: title,
        keyboardType: 'default',
      },
      {
        key: 'description',
        label: 'Description',
        placeholder: 'Description',
        autoFocus: false,
        secureTextEntry: false,
        value: description,
        keyboardType: 'default',
        multiline: true,
      },
      {
        key: 'minAttendees',
        label: 'Minimum attendees',
        placeholder: 'Minimum attendees',
        autoFocus: false,
        secureTextEntry: false,
        value: minAttendees,
        keyboardType: 'numeric',
      },
      {
        key: 'maxAttendees',
        label: 'Maximum attendees',
        placeholder: 'Maximum attendees',
        autoFocus: false,
        secureTextEntry: false,
        value: maxAttendees,
        keyboardType: 'numeric',
      },
    ];
  }

  renderInputs() {
    const { error } = this.state;
    const { placeholderTextColor, navigation } = this.props;
    const edit = navigation.getParam('edit', false);
    const onChangeText = {
      title: this.onChangeTitle,
      description: this.onChangeDescription,
      minAttendees: this.onChangeMinAttendees,
      maxAttendees: this.onChangeMaxAttendees,
    };
    return (
      <View style={styles.container}>
        {this.getFields().map((field) => {
          const {
            key,
            label,
            placeholder,
            value,
            autoFocus,
            secureTextEntry,
            keyboardType,
            multiline,
          } = field;
          return (
            <View key={key}>
              {edit && <FormLabel>{label}</FormLabel>}
              <FormInput
                style={styles.FormInput}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                underlineColorAndroid={'#fff'}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={onChangeText[key]}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputContainer}
                placeholderTextColor={placeholderTextColor}
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

  renderDatePicker() {
    const { date } = this.state;
    return (
      <View>
        <FormLabel>Date and time</FormLabel>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS date={date} onDateChange={this.onChangeDate} />
        ) : (
          <DatePickerAndroid date={date} onDateChange={this.onChangeDate} />
        )}
      </View>
    );
  }

  renderImage(uri) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={{ uri }} style={{ width: '100%', height: 180 }} />
      </View>
    );
  }

  renderInviteImage() {
    const { uploadingImage, image } = this.state;
    if (uploadingImage) {
      return (
        <View style={[styles.cover]}>
          <ActivityIndicator size="large" color={color.themeRed} />
        </View>
      );
    }
    if (image) {
      return this.renderImage(image);
    }
    return (
      <View style={[styles.cover]}>
        <Icon
          style={{
            justifyContent: 'center',
          }}
          name={'md-image'}
          type="ionicon"
          color={color.grey}
          size={60}
        />
      </View>
    );
  }

  render() {
    console.log('this.state', this.state);
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInviteImage()}
          <Button
            title="Select new invite image"
            onPress={this.pickImage}
            buttonStyle={styles.imageButton}
            textStyle={styles.imageButtonText}
          />
          {this.renderInputs()}
          {this.renderDatePicker()}
        </ScrollView>
        <Button
          raised
          title="SAVE INVITE"
          borderRadius={10}
          containerViewStyle={styles.containerView}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this.onSubmit}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

NewInvite.defaultProps = {
  autoFocus: false,
  secureTextEntry: false,
  placeholderTextColor: 'grey',
  keyboardType: 'default',
};

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default withNavigationFocus(
  connect(
    mapStateToProps,
    { addInvite, updateInvite }
  )(NewInvite)
);
