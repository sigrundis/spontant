import React, { Component } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import moment from 'moment';
import { Button, Icon, CheckBox } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import InputField from '../../components/InputField';
import DatePickerModal from '../../components/DatePickerModal';
import styles from './styles';
import { validateInvite } from '../../utils/validation';
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
      image,
      minAttendees,
      maxAttendees,
    } = navigation.getParam('invite', {});
    var defaultDate = new Date();
    defaultDate.setHours(defaultDate.getHours() + 23);
    this.state = {
      title: title || '',
      date: defaultDate,
      description: description || '',
      minAttendees: minAttendees || 0,
      maxAttendees: Number(maxAttendees) ? maxAttendees : 10,
      unlimitedMaxAttendees: maxAttendees === 'unlimited',
      error: error,
      image: image || '',
      uploadingImage: false,
      isDatePickerModalVisible: false,
      validationErrors: {
        isEmpty: true,
        title: [],
        date: [],
        description: [],
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMinAttendees = this.onChangeMinAttendees.bind(this);
    this.onChangeMaxAttendees = this.onChangeMaxAttendees.bind(this);
    this.onAddNumber = this.onAddNumber.bind(this);
    this.onSubtractNumber = this.onSubtractNumber.bind(this);
    this.openDatePickerModal = this.openDatePickerModal.bind(this);
    this.closeDatePickerModal = this.closeDatePickerModal.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { previousModeWasEdit, populatedDefaultState } = state;
    const { isFocused, navigation } = props;
    if (!isFocused)
      return {
        populatedDefaultState: false,
        validationErrors: {
          isEmpty: true,
          title: [],
          date: [],
          description: [],
        },
      };
    const edit = navigation.getParam('edit', false);

    // If the user was creating a new invite last time they were using the input fields
    // but didn't save, we want to keep their input, i.e. don't change the state.
    if ((!previousModeWasEdit && !edit) || populatedDefaultState) return null;
    const invite = navigation.getParam('invite', {});
    const {
      title,
      date,
      description,
      minAttendees,
      maxAttendees,
      image,
    } = invite;
    var defaultDate = new Date();
    defaultDate.setHours(defaultDate.getHours() + 23);
    return {
      populatedDefaultState: true,
      previousModeWasEdit: edit,
      title: title || '',
      date: date ? new Date(date) : defaultDate,
      description: description || '',
      minAttendees: minAttendees || 0,
      maxAttendees: Number(maxAttendees) ? maxAttendees : 10,
      unlimitedMaxAttendees: maxAttendees === 'unlimited',
      image,
    };
  }

  onSubmit() {
    let { navigation } = this.props;
    const { title, description } = this.state;
    const edit = navigation.getParam('edit', false);
    const validationErrors = validateInvite({ title, description });
    if (!validationErrors.isEmpty) {
      this.setState({ validationErrors });
    } else {
      if (edit) this.editInvite();
      else this.saveInvite();
    }
  }

  editInvite() {
    const {
      title,
      date,
      image,
      description,
      minAttendees,
      maxAttendees,
      unlimitedMaxAttendees,
    } = this.state;
    let { navigation } = this.props;
    const invite = navigation.getParam('invite', {});
    invite.title = title || invite.title;
    invite.date = date || invite.date;
    invite.description = description || invite['description'];
    invite.minAttendees = minAttendees || invite['minAttendees'];
    invite.maxAttendees = unlimitedMaxAttendees
      ? 'unlimited'
      : maxAttendees || invite['maxAttendees'];
    invite.image = image || invite['image'];
    invite.edited = true;
    this.props.updateInvite(invite, this.onSuccess, this.onError);
  }

  saveInvite() {
    const {
      title,
      date,
      description,
      minAttendees,
      maxAttendees,
      unlimitedMaxAttendees,
      image,
    } = this.state;
    const { user } = this.props;
    const { isFacebookUser, displayname, username, email } = user;

    const newInvite = {
      title,
      date: date,
      description: description,
      minAttendees: minAttendees,
      maxAttendees: unlimitedMaxAttendees ? 'unlimited' : maxAttendees,
      image,
      userId: user.uid,
      joinCount: 1,
      author: {
        isFacebookUser: isFacebookUser || false,
        username: isFacebookUser ? '' : username,
        name: displayname,
        email: email || '',
      },
      attendees: { [user.uid]: true },
      timePublished: new Date(),
    };

    this.props.addInvite(newInvite, this.onSuccess, this.onError);
  }

  onSuccess = () => {
    const { navigation } = this.props;
    var defaultDate = new Date();
    defaultDate.setHours(defaultDate.getHours() + 23);
    this.setState(
      {
        title: '',
        date: defaultDate,
        description: '',
        minAttendees: 0,
        maxAttendees: 10,
        unlimitedMaxAttendees: false,
        image: '',
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

  onChangeNumberControl(text, stateKey) {
    const { navigation } = this.props;
    const invite = navigation.getParam('invite', {});
    const { joinCount } = invite;
    let number = Number(text.replace(/[^0-9\.]+/g, ''));
    if (joinCount >= number && stateKey === 'maxAttendees') {
      number = joinCount;
    }
    this.setState({ [stateKey]: number });
  }

  onAddNumber(stateKey) {
    let number = this.state[stateKey];
    this.setState({ [stateKey]: number + 1 });
  }

  onSubtractNumber(stateKey) {
    let number = this.state[stateKey];
    this.setState({ [stateKey]: number - 1 });
  }

  openDatePickerModal() {
    this.setState({ isDatePickerModalVisible: true });
  }

  closeDatePickerModal() {
    this.setState({ isDatePickerModalVisible: false });
  }

  getFields() {
    const { title, description, validationErrors } = this.state;
    return [
      {
        key: 'title',
        label: 'Title',
        placeholder: 'Title',
        autoFocus: false,
        secureTextEntry: false,
        value: title,
        keyboardType: 'default',
        validationErrors: validationErrors.title,
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
        validationErrors: validationErrors.description,
      },
    ];
  }

  renderInputs() {
    const { placeholderTextColor } = this.props;
    const onChangeText = {
      title: this.onChangeTitle,
      description: this.onChangeDescription,
      minAttendees: this.onChangeMinAttendees,
      maxAttendees: this.onChangeMaxAttendees,
    };
    return (
      <View>
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
                placeholderTextColor={placeholderTextColor}
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

  renderDatePicker() {
    const { isDatePickerModalVisible, date } = this.state;
    return (
      <View style={styles.dateSection}>
        <Text style={styles.label}>Date and time:</Text>
        <View style={styles.date}>
          <Text>{date && moment(date).format('LLLL')}</Text>
          <TouchableOpacity onPress={this.openDatePickerModal}>
            <Text style={styles.link}>Select date</Text>
          </TouchableOpacity>
        </View>
        <DatePickerModal
          isVisible={isDatePickerModalVisible}
          onChangeDate={this.onChangeDate}
          onCloseModal={this.closeDatePickerModal}
          value={date}
        />
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
          <ActivityIndicator size="large" color={color.themeOrange} />
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

  renderNumberController(stateKey, label) {
    const { navigation } = this.props;
    const invite = navigation.getParam('invite', {});
    const { joinCount } = invite;
    const { unlimitedMaxAttendees } = this.state;
    const value = this.state[stateKey];
    const isSubstractDisabled =
      value === 0 ||
      (stateKey === 'maxAttendees' && unlimitedMaxAttendees) ||
      (stateKey === 'maxAttendees' && joinCount >= value);
    const isAddDisabled = stateKey === 'maxAttendees' && unlimitedMaxAttendees;
    return (
      <View style={styles.numberController}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.numberControllerWrapper}>
          <TouchableOpacity
            onPress={() =>
              isSubstractDisabled ? {} : this.onSubtractNumber(stateKey)
            }
          >
            <Icon
              name={'md-remove-circle'}
              type="ionicon"
              color={
                isSubstractDisabled ? color.themeLightOrange : color.themeOrange
              }
              size={35}
            />
          </TouchableOpacity>

          {stateKey === 'maxAttendees' && unlimitedMaxAttendees ? (
            <View style={styles.numberControllerIconWrapper}>
              <Icon
                name={'ios-infinite'}
                type="ionicon"
                color={color.themeNight}
                size={20}
              />
            </View>
          ) : (
            <TextInput
              style={styles.numberControllerNumber}
              value={String(value)}
              onChangeText={(text) =>
                this.onChangeNumberControl(text, stateKey)
              }
              keyboardType={'numeric'}
            />
          )}

          <TouchableOpacity
            onPress={() => (isAddDisabled ? {} : this.onAddNumber(stateKey))}
          >
            <Icon
              style={{}}
              name={'md-add-circle'}
              type="ionicon"
              color={isAddDisabled ? color.themeLightOrange : color.themeOrange}
              size={35}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCheckBox(stateKey, title) {
    const checked = this.state[stateKey];
    return (
      <CheckBox
        containerStyle={styles.checkBoxContainer}
        center
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={color.themeOrange}
        uncheckedColor={color.themeOrange}
        title={title}
        checked={checked}
        onPress={() => this.setState({ [stateKey]: !checked })}
      />
    );
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
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
          {this.renderNumberController('minAttendees', 'Min attendees')}
          {this.renderNumberController('maxAttendees', 'Max attendees')}
          {this.renderCheckBox('unlimitedMaxAttendees', 'Unlimited')}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button
            raised
            title="SAVE INVITE"
            borderRadius={10}
            containerViewStyle={styles.containerView}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
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
