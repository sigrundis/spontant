import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import { actions as auth } from '../../index';
import styles from './styles';
import Form from '../../components/Form';
import SignInWithFacebookButton from '../../components/SignInWithFacebookButton';

const { login, onSignInWithFacebook } = auth;

const error = {
  general: '',
  email: '',
  password: '',
};

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

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: error,
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { isFocused } = props;
    const { isOpened } = state;
    const updatedState = {};
    // Clear error message when the login scene is opened
    if (!isOpened && isFocused) {
      updatedState.error = {
        general: '',
        email: '',
        password: '',
      };
    }
    updatedState.isOpened = isFocused;
    return updatedState;
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
    this.setState({ isLoading: true });
    this.setState({ error }); //clear out error messages
    this.props.login(data, this.onSuccess, this.onError);
  }

  onSuccess = ({ exists, user }) => {
    /*
    It sounds logical to navigate to the 'loggedIn' switch navigator here by doing
    const { navigation } = this.props;
    navigation.navigate('LoggedIn');
    but App.js handles which navigator is activated by checking if the user is logged in or not.
    */
    // this.setState({ isLoading: false });
    if (!exists) this.props.navigation.navigate('CompleteProfile', { user });
  };

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj.general = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }
    this.setState({ isLoading: false, error: errObj });
  }

  render() {
    const { navigation } = this.props;
    const { isLoading, error } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.signInWithFacebookSection}>
            <SignInWithFacebookButton buttonTitle="SIGN IN WITH FACEBOOK" />
          </View>
          <View style={styles.orContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
          </View>
          <View style={styles.regularSignInSection}>
            <Form
              isLoading={isLoading}
              fields={fields}
              onSubmit={this.onSubmit}
              buttonTitle={'LOG IN'}
              error={error}
              onForgotPassword={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigationFocus(
  connect(
    null,
    { login, onSignInWithFacebook }
  )(Login)
);
