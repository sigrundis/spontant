import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { actions as auth } from '../../index';
import styles from './styles';
import Form from '../../components/Form';
import SignInWithFacebookButton from '../../components/SignInWithFacebookButton';

const { login, onSignInWithFacebook } = auth;

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
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    autoFocus: false,
    secureTextEntry: true,
    value: '',
    type: 'password',
  },
];

const error = {
  general: '',
  email: '',
  password: '',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  //get users permission authorization (ret: facebook token)
  async onSignInWithFacebook() {
    const options = { permissions: ['public_profile', 'email'] };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      c.FACEBOOK_APP_ID,
      options
    );

    if (type === 'success') {
      this.props.signInWithFacebook(token, this.onSuccess, this.onError);
    }
  }

  onForgotPassword() {
    const { navigation } = this.props;
    navigation.navigate('ForgotPassword');
  }

  onSubmit(data) {
    this.setState({ error: error }); //clear out error messages
    this.props.login(data, this.onSuccess, this.onError);
  }

  onSuccess = ({ exists, user }) => {
    if (exists) this.props.navigation.navigate('LoggedIn');
    else this.props.navigation.navigate('CompleteProfile', { user });
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <SignInWithFacebookButton />
          <Form
            fields={fields}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={'LOG IN'}
            error={this.state.error}
            onForgotPassword={() => navigation.navigate('ForgotPassword')}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  { login, onSignInWithFacebook }
)(Login);
