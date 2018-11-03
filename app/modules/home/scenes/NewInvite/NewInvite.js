import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './styles';
import { isEmpty } from '../../../auth/utils/validate';
import { actions as home, theme } from '../../index';
const { addInvite, updateInvite } = home;

const error = {};

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
      description,
      minAttendees,
      maxAttendees,
      error: error,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
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
    const { title, description, minAttendees, maxAttendees } = invite;
    return {
      previousModeWasEdit: edit,
      title,
      description,
      minAttendees,
      maxAttendees,
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
    invite['description'] = description || invite['description'];
    invite['minAttendees'] = minAttendees || invite['minAttendees'];
    invite['maxAttendees'] = maxAttendees || invite['maxAttendees'];
    this.props.updateInvite(invite, this.onSuccess, this.onError);
  }

  saveInvite() {
    const { title, description, minAttendees, maxAttendees } = this.state;
    const { user } = this.props;

    const newInvite = {
      title: title,
      description: description,
      minAttendees: minAttendees,
      maxAttendees: maxAttendees,
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
        description: null,
        minAttendees: null,
        maxAttendees: null,
      },
      () => navigation.navigate('Home')
    );
  };

  onError(error) {
    alert(error.message);
  }

  onChangeTitle(title) {
    this.setState({ title });
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
    const { placeholderTextColor } = this.props;
    const showLabel = false;
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
            <View style={styles.FormInput} key={key}>
              {showLabel && <FormLabel>{label}</FormLabel>}
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

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {this.renderInputs()}
        <Button
          raised
          title="SAVE INVITE"
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
