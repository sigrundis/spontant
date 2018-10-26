import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import Home from '../modules/home/scenes/Home';
import NewInvite from '../modules/home/scenes/NewInvite';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Heima',
      }),
    },
    NewInvite: { screen: NewInvite },
  },
  {
    initialRouteName: Home,
  }
);

export default HomeStack;
