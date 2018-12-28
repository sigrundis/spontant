import React from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { actions as auth } from '../../index';
const { register } = auth;
import styles from './styles';
import Form from '../../components/Form';

const fields = [
  {
    key: 'email',
    label: 'Email Address',
    placeholder: 'Email Address',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'email',
  },
  {
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
  {
    key: 'displayname',
    label: 'Display name',
    placeholder: 'Display name',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    autoFocus: false,
    secureTextEntry: true,
    value: '',
    type: 'password',
  },
  {
    key: 'confirm_password',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    autoFocus: false,
    secureTextEntry: true,
    value: '',
    type: 'confirm_password',
  },
];

const error = {
  general: '',
  email: '',
  password: '',
  confirm_password: '',
};

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUpdatedPassword = this.onChangeUpdatedPassword.bind(this);
  }

  onSubmit(data) {
    const { register } = this.props;
    this.setState({ error }); //clear out error messages
    register(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    /*
    It sounds logical to navigate to the 'loggedIn' switch navigator here by doing
    const { navigation } = this.props;
    navigation.navigate('LoggedIn');
    but App.js handles which navigator is activated by checking if the user is logged in or not.
    */
  }

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

  onChangeEmail(email) {
    this.setState({ email });
  }

  onChangeUserName(userName) {
    this.setState({ username });
  }

  onChangeDisplayName(displayName) {
    this.setState({ displayName });
  }

  onChangePassword(password) {
    this.setState({ password });
  }

  onChangeUpdatedPassword(updatedPassword) {
    this.setState({ updatedPassword });
  }

  render() {
    const onChangeText = {
      email: this.onChangeEmail,
      userName: this.onChangeUserName,
      displayName: this.onChangeDisplayName,
      password: this.onChangePassword,
      updatedPassword: this.onChangeUpdatedPassword,
    };
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
        <ScrollView>
          <Form
            fields={fields}
            onChangeText={onChangeText}
            onSubmit={this.onSubmit}
            buttonTitle={'SIGN UP'}
            error={this.state.error}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  null,
  { register }
)(Register);
