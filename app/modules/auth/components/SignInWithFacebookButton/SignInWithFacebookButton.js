import React from 'react';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';

import { actions as auth, constants as c } from '../../index';
const { signInWithFacebook, signUpWithFacebook } = auth;

import styles from './styles';

class SignInWithFacebookButton extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onSignUpWithFacebook = this.onSignUpWithFacebook.bind(this);
    this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
  }

  onPress() {
    const { signUp } = this.props;
    if (signUp) {
      this.onSignUpWithFacebook();
    } else {
      this.onSignInWithFacebook();
    }
  }

  //get users permission authorization (ret: facebook token)
  async onSignInWithFacebook() {
    console.log('on press signin');
    const { onPress } = this.props;
    onPress();
    const options = {
      permissions: ['public_profile', 'email'],
      behavior: 'web',
    };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      c.FACEBOOK_APP_ID,
      options
    );
    if (type === 'success') {
      this.props.signInWithFacebook(token, this.onSuccess, this.onError);
    }
  }

  //get users permission authorization (ret: facebook token)
  async onSignUpWithFacebook() {
    const { onPress } = this.props;
    onPress();
    const options = {
      permissions: ['public_profile', 'email'],
      behavior: 'web',
    };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      c.FACEBOOK_APP_ID,
      options
    );
    if (type === 'success') {
      this.props.signUpWithFacebook(token, this.onSuccess, this.onError);
    }
  }

  onSuccess() {
    /*
    It sounds logical to navigate to the 'loggedIn' switch navigator here by doing
    const { navigation } = this.props;
    navigation.navigate('LoggedIn');
    but App.js handles which navigator is activated by checking if the user is logged in or not.
    */
    // const { navigation } = this.props;
    // navigation.navigate('LoggedIn');
  }

  onError(error) {
    alert(error.message);
  }

  render() {
    const { buttonTitle } = this.props;
    return (
      <SocialIcon
        raised
        button
        type="facebook"
        title={buttonTitle}
        iconSize={19}
        style={[styles.containerView, styles.socialButton]}
        fontStyle={styles.buttonText}
        onPress={this.onPress}
      />
    );
  }
}

SignInWithFacebookButton.propTypes = {
  signUp: PropTypes.bool,
};

SignInWithFacebookButton.defaultProps = {
  buttonTitle: 'SIGN UP WITH FACEBOOK',
  onPress: () => {},
};

export default connect(
  null,
  { signInWithFacebook, signUpWithFacebook }
)(SignInWithFacebookButton);
