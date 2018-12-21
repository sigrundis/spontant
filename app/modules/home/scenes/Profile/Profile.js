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
    /*
    It sounds logical to navigate to the 'loggedOut' switch navigator here by doing
    const { navigation } = this.props;
    navigation.navigate('LoggedOut');
    but App.js handles which navigator  is activated by checking if the user is logged in or not.
    */
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
            type="material-community"
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
    if (!user || !user.displayname)
      return (
        <TouchableOpacity onPress={this.onSignOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      );
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.header}>
            {user && user.userimage
              ? this.renderImage(user.userimage)
              : this.renderNameCard()}
            <Text style={styles.title}>{user && user.displayname}</Text>
          </View>
          <Text style={styles.subTitle}>User Information</Text>
          <View style={styles.userInfo}>
            {this.renderUserInfo('Email', user.email || '-', 'email')}
            {this.renderUserInfo(
              'Phone number',
              user.phonenumber || '-',
              'cellphone-iphone'
            )}
            {this.renderUserInfo(
              'Facebook',
              user.facebook || '-',
              'facebook-box'
            )}
            {this.renderUserInfo(
              'Instagram',
              user.instagram || '-',
              'instagram'
            )}
            {this.renderUserInfo('Twitter', user.twitter || '-', 'twitter')}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={this.onSignOut}>
          <View style={styles.signOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { authReducer } = state;
  return {
    user: authReducer.user,
  };
}

export default withNavigationFocus(
  connect(
    mapStateToProps,
    { signOut }
  )(Profile)
);
