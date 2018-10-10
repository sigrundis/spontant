import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './styles';
import { isEmpty } from '../../../auth/utils/validate';
import { actions as home, theme } from '../../index';
const { addInvite, updateInvite } = home;

const fields = [
  {
    key: 'title',
    label: 'Title',
    placeholder: 'Title',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
  {
    key: 'description',
    label: 'Description',
    placeholder: 'Description',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
  {
    key: 'minAttendees',
    label: 'Minimum attendees',
    placeholder: 'Minimum attendees',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'number',
  },
  {
    key: 'maxAttendees',
    label: 'Maximum attendees',
    placeholder: 'Maximum attendees',
    autoFocus: false,
    secureTextEntry: true,
    value: '',
    type: 'number',
  },
];

const error = {};

class NewInvite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: error,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMinAttendees = this.onChangeMinAttendees.bind(this);
    this.onChangeMaxAttendees = this.onChangeMaxAttendees.bind(this);
  }

  onSubmit() {
    const { edit } = this.props;
    if (edit) this.editInvite();
    else this.saveInvite();
  }

  editInvite() {
    const { title, description, minAttendees, maxAttendees } = this.state;
    let { invite } = this.props;
    invite['title'] = title;
    invite['description'] = description;
    invite['minAttendees'] = minAttendees;
    invite['maxAttendees'] = maxAttendees;
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
      joinCount: 0,
      author: {
        username: user.username,
        name: user.displayname,
      },
    };
    this.props.addInvite(newInvite, this.onSuccess, this.onError);
  }

  onSuccess() {
    Actions.pop();
  }

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

  renderInputs() {
    const { error } = this.state;
    const { placeholderTextColor, keyboardType } = this.props;
    const showLabel = false;
    const onChangeText = {
      title: this.onChangeTitle,
      description: this.onChangeDescription,
      minAttendees: this.onChangeMinAttendees,
      maxAttendees: this.onChangeMaxAttendees,
    };
    return (
      <View style={styles.container}>
        {fields.map((field) => {
          const {
            key,
            label,
            placeholder,
            value,
            autoFocus,
            secureTextEntry,
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

export default connect(
  mapStateToProps,
  { addInvite, updateInvite }
)(NewInvite);
