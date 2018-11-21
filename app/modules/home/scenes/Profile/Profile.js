import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { actions as auth } from '../../../auth/index';
const { signOut } = auth;
import styles from './styles';
import { theme } from '../../index';
const { color } = theme;

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { user };
    this.onSignOut = this.onSignOut.bind(this);
    this.onPressSignOut = this.onPressSignOut.bind(this);
  }

  onSignOut() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Sign out', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) this.onPressSignOut();
      }
    );
  }

  onPressSignOut = (screen) => {
    this.props.signOut(
      this.onSuccessSignOut.bind(this),
      this.onErrorSignOut.bind(this)
    );
  };

  static getDerivedStateFromProps(props, state) {
    const { user, isFocused } = props;
    if (!isFocused) return null;
    return { user };
  }

  onSuccessSignOut() {
    const { navigation } = this.props;
    navigation.navigate('LoggedOut');
  }

  onErrorSignOut(error) {
    alert('Oops!', error.message);
  }

  renderImage(uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
    );
  }

  renderNameCard() {
    console.log('rendernamecard');
    const { user } = this.state;
    return (
      <View style={styles.namecard}>
        <Text style={{ color: 'white', fontSize: 28 }}>
          {user &&
            user.displayname
              .split(' ')
              .map((x) => x[0])
              .join('')}
        </Text>
      </View>
    );
  }

  renderUserInfo(label, detail, iconName) {
    return (
      <View style={styles.infoLine}>
        <View style={styles.labelContainer}>
          <Icon
            name={iconName}
            type="ionicon"
            color={color.themeNight}
            size={15}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.state;
    console.log('user', user);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.header}>
            {user && user.userimage
              ? this.renderImage(user.userimage)
              : this.renderNameCard()}
            <Text style={styles.title}>{user.displayname}</Text>
          </View>
          <Text style={styles.subTitle}>User Information</Text>
          <View style={styles.userInfo}>
            {this.renderUserInfo('Email', user.email || '-', 'md-mail')}
            {this.renderUserInfo(
              'Phone number',
              user.phonenumber || '-',
              'ios-call'
            )}
            {this.renderUserInfo(
              'Facebook',
              user.facebook || '-',
              'logo-facebook'
            )}
            {this.renderUserInfo(
              'Instagram',
              user.instagram || '-',
              'logo-instagram'
            )}
            {this.renderUserInfo(
              'Twitter',
              user.twitter || '-',
              'logo-twitter'
            )}
          </View>
        </ScrollView>
        <View style={styles.signOut}>
          <TouchableOpacity onPress={this.onSignOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default withNavigationFocus(
  connect(
    mapStateToProps,
    { signOut }
  )(Profile)
);
