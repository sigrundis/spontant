import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import {
  StackActions,
  NavigationActions,
  DrawerActions,
} from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { actions as auth } from '../../../auth/index';
const { signOut } = auth;

import styles from './styles';

const MENU_ITEMS = [
  {
    name: 'Heim',
    icon: 'md-home',
    type: 'ionicon',
    screen: 'Main',
    iconColor: '#fff',
  },
  {
    name: 'Logout',
    icon: 'md-exit',
    type: 'ionicon',
    screen: 'Welcome',
    iconColor: '#fff',
  },
];

class DrawerMenu extends Component {
  onPressHandler = (screen) => {
    const { navigation } = this.props;

    navigation.dispatch(DrawerActions.closeDrawer());

    if (screen === 'Home') {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen })],
      });
      navigation.dispatch(resetAction);
    }
    if (screen == 'Welcome') {
      this.props.signOut(
        this.onSuccessSignOut.bind(this),
        this.onErrorSignOut.bind(this)
      );
    } else {
      navigation.navigate(screen);
    }
  };

  onSuccessSignOut() {
    Actions.Auth();
  }

  onErrorSignOut(error) {
    console.error('on sign out error', error);
    alert('Oops!', error.message);
  }

  render() {
    const { container, titleContainer, titleText } = styles;

    return (
      <View style={container}>
        {MENU_ITEMS.map((item, i) => {
          const { name, icon, color, screen, type } = item;

          return (
            <ListItem
              key={i}
              leftIcon={{ name: icon, color, type }}
              title={
                <View style={titleContainer}>
                  <Text style={titleText}>{name}</Text>
                </View>
              }
              onPress={() => this.onPressHandler(screen)}
            />
          );
        })}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(
  mapStateToProps,
  { signOut }
)(DrawerMenu);
