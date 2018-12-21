import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import { Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import SvgLogo from '../../../../components/SvgLogo';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import SignInWithFacebookButton from '../../components/SignInWithFacebookButton';
import { actions as auth } from '../../index';
const { signInWithFacebook } = auth;

import styles from './styles';
const { width } = Dimensions.get('window');
const image1Small = require('../../../../static/img/barnaganga_small.jpg');
const image2Small = require('../../../../static/img/basket_small.jpg');
const image3Small = require('../../../../static/img/pizza_small.jpg');
const image4Small = require('../../../../static/img/skidi_small.jpg');
const image5Small = require('../../../../static/img/utilega_small.jpg');
const image1 = require('../../../../static/img/barnaganga.jpg');
const image2 = require('../../../../static/img/basket.jpg');
const image3 = require('../../../../static/img/pizza.jpg');
const image4 = require('../../../../static/img/skidi.jpg');
const image5 = require('../../../../static/img/utilega.jpg');

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = { numOfBackground: 5, scrollValue: 0, scrolled: 0 };
  }

  componentDidMount() {
    const { isFocused } = this.props;
    const { slideShowInterval } = this.state;
    if (isFocused && !slideShowInterval) {
      this.setSlideShowInterval();
    }
  }

  slideShowIntervalFunction = () => {
    let { scrolled, scrollValue, numOfBackground } = this.state;
    scrolled++;
    if (scrolled < numOfBackground) {
      scrollValue = scrollValue + width;
    } else {
      scrollValue = 0;
      scrolled = 0;
    }
    this._scrollView.scrollTo({ x: scrollValue });
    this.setState({ scrolled, scrollValue });
  };

  setSlideShowInterval() {
    const slideShowInterval = setInterval(this.slideShowIntervalFunction, 3000);
    this.setState({ slideShowInterval });
  }

  clearSlideShowInterval() {
    const { slideShowInterval } = this.state;
    clearInterval(slideShowInterval);
    this.setState({ slideShowInterval: null });
  }

  onPressSignIn() {
    const { navigation } = this.props;
    this.clearSlideShowInterval();
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
          <ProgressiveImage
            thumbnailSource={image1Small}
            source={image1}
            style={{ height: '100%', width }}
          />
          <ProgressiveImage
            thumbnailSource={image2Small}
            source={image2}
            style={{ height: '100%', width }}
          />
          <ProgressiveImage
            thumbnailSource={image3Small}
            source={image3}
            style={{ height: '100%', width }}
          />
          <ProgressiveImage
            thumbnailSource={image4Small}
            source={image4}
            style={{ height: '100%', width }}
          />
          <ProgressiveImage
            thumbnailSource={image5Small}
            source={image5}
            style={{ height: '100%', width }}
          />
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
    const { slideShowInterval } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => {
            if (!slideShowInterval) {
              this.setSlideShowInterval();
            }
          }}
        />
        {this.renderTopContainer()}
        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <SignInWithFacebookButton
              signUp
              onPress={() => {
                this.clearSlideShowInterval();
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
                this.clearSlideShowInterval();
                navigation.navigate('Register');
              }}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                this.clearSlideShowInterval();
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
