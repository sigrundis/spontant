import React from 'react';
import { Facebook } from 'expo';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';

import { actions as auth, constants as c } from '../../index';
const { signInWithFacebook } = auth;

import styles from './styles';

class SignInWithFacebookButton extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
  }

  //get users permission authorization (ret: facebook token)
  async onSignInWithFacebook() {
    const { onPress } = this.props;
    onPress();
    const options = { permissions: ['public_profile', 'email'] };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      c.FACEBOOK_APP_ID,
      options
    );
    if (type === 'success') {
      this.props.signInWithFacebook(token, this.onSuccess, this.onError);
    }
  }

  onSuccess() {
    console.log('on success in signin with facebook');
    const { navigation } = this.props;
    navigation.navigate('LoggedIn');
  }

  onError(error) {
    alert(error.message);
  }

  render() {
    return (
      <SocialIcon
        raised
        button
        type="facebook"
        title="SIGN UP WITH FACEBOOK"
        iconSize={19}
        style={[styles.containerView, styles.socialButton]}
        fontStyle={styles.buttonText}
        onPress={this.onSignInWithFacebook}
      />
    );
  }
}

export default connect(
  null,
  { signInWithFacebook }
)(SignInWithFacebookButton);
