import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Facebook } from 'expo';
import { Button, SocialIcon, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth, constants as c } from '../../index';
const { signInWithFacebook } = auth;

import styles from './styles';

const image = require('../../../../static/img/icon.png');

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
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

  onSuccess({ exists, user }) {
    if (exists) Actions.Main();
    else Actions.CompleteProfile({ user });
  }

  onError(error) {
    alert(error.message);
  }

  onPressSignIn() {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.image} source={image} />
          <Text style={styles.title}>Spontant</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
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

            <View style={styles.orContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.orText}>Or</Text>
            </View>

            <Button
              raised
              borderRadius={4}
              title={'SIGN UP WITH E-MAIL'}
              containerViewStyle={[styles.containerView]}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { signInWithFacebook }
)(Welcome);
