import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import DrawerMenu from '../modules/home/scenes/DrawerMenu';
import transitionConfig from '../modules/home/utils/navigationAnimation';
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NewInvite from '../modules/home/scenes/NewInvite';
import Profile from '../modules/home/scenes/Profile';
import { color } from '../styles/theme';
import store from '../redux/store';
import { checkLoginStatus } from '../modules/auth/actions';

let userExists = false;
let isReady = false;
let isUserLoggedIn = false;

store.dispatch(
  checkLoginStatus((exist, isLoggedIn) => {
    isReady = true;
    userExists = exist;
    isUserLoggedIn = isLoggedIn;
  })
);

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const AuthStack = createStackNavigator(
  {
    Welcome: { screen: Welcome },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Sign Up',
        headerStyle,
      },
    },
    CompleteProfile: { screen: CompleteProfile },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
  },
  // Default config for all screens
  {
    initialRouteName: 'Welcome',
  }
);

// Manifest of possible screens
const MainStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-home' : 'ios-home-outline'}
            type={'ionicon'}
            size={26}
            color={color.themeRed}
          />
        ),
      },
    },
    NewInvite: {
      screen: NewInvite,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'}
            type={'ionicon'}
            size={26}
            color={color.themeRed}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          console.log('tab bar on press', navigation);
          navigation.setParams({ edit: false, invite: {} });
          navigation.navigate('NewInvite', {
            edit: false,
            invite: {},
          });
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            type={'ionicon'}
            size={26}
            color={color.themeRed}
          />
        ),
      },
    },
  },
  // Default config for all screens
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);

export const createRootNavigator = (loggedIn = false) => {
  return createSwitchNavigator(
    {
      LoggedIn: { screen: MainStack },
      LoggedOut: { screen: AuthStack },
    },
    {
      initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut',
    }
  );
};

const Drawer = createDrawerNavigator(
  {
    Main: { screen: isUserLoggedIn ? MainStack : AuthStack },
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: 300,
  }
);

export default Drawer;
