import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Facebook, Svg } from 'expo';
import { Button, Divider, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import SvgLogo from '../../../../components/SvgLogo';
import SignInWithFacebookButton from '../../components/SignInWithFacebookButton';
import { actions as auth, constants as c } from '../../index';
const { signInWithFacebook } = auth;
const { Circle, G, Path } = Svg;

import styles from './styles';
const { width, height } = Dimensions.get('window');
const image1 = require('../../../../static/img/barnaganga.jpg');
const image2 = require('../../../../static/img/basket.jpg');
const image3 = require('../../../../static/img/pizza.jpg');
const image4 = require('../../../../static/img/skidi.jpg');
const image5 = require('../../../../static/img/utilega.jpg');

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { isFocused } = this.props;
    if (isFocused) {
      const numOfBackground = 5;
      let scrollValue = 0,
        scrolled = 0;
      const slideShowInterval = setInterval(() => {
        scrolled++;
        if (scrolled < numOfBackground) {
          scrollValue = scrollValue + width; // width = screen width
        } else {
          scrollValue = 0;
          scrolled = 0;
        }
        this._scrollView.scrollTo({ x: scrollValue });
      }, 3000);
      this.setState({ slideShowInterval });
    }
  }

  onPressSignIn() {
    const { navigation } = this.props;
    clearInterval(this.state.slideShowInterval);
    navigation.navigate('Login');
  }

  renderTopContainer() {
    return (
      <View style={styles.topContainer}>
        <ScrollView
          ref={(scrollView) => {
            this._scrollView = scrollView;
          }}
          horizontal={true}
          pagingEnabled={true}
        >
          <Image source={image1} style={{ height: '100%', width }} />
          <Image source={image2} style={{ height: '100%', width }} />
          <Image source={image3} style={{ height: '100%', width }} />
          <Image source={image4} style={{ height: '100%', width }} />
          <Image source={image5} style={{ height: '100%', width }} />
        </ScrollView>
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <SvgLogo height={150} width={150} />
          <Text style={styles.title}>Spontant</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.renderTopContainer()}
        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <SignInWithFacebookButton
              onPress={() => {
                clearInterval(this.state.slideShowInterval);
              }}
              navigation={navigation}
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
              onPress={() => {
                clearInterval(this.state.slideShowInterval);
                navigation.navigate('Register');
              }}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                clearInterval(this.state.slideShowInterval);
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigationFocus(
  connect(
    null,
    { signInWithFacebook }
  )(Welcome)
);
