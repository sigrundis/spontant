import React from 'react';
import { Platform, TouchableOpacity, View, StatusBar } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NewInvite from '../modules/home/scenes/NewInvite';
import Profile from '../modules/home/scenes/Profile';
import EditProfile from '../modules/home/scenes/EditProfile';
import Attendees from '../modules/home/scenes/Attendees';
import { color } from '../styles/theme';

let showEditProfileButton = false;
let showBackToHomeButton = false;

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerRight: <View />, //To center title on android
        title: 'Sign Up',
        headerStyle,
        headerTintColor: color.themeNight,
      },
    },
    CompleteProfile: { screen: CompleteProfile },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
  },
  {
    initialRouteName: 'Welcome',
  }
);

const MainTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'home' : 'home-outline'}
            type={'material-community'}
            size={26}
            color={color.themeNight}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          showEditProfileButton = false;
          (showBackToHomeButton = false),
            navigation.navigate('Home', { title: 'Home' });
        },
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
            color={color.themeNight}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          showEditProfileButton = false;
          showBackToHomeButton = true;
          navigation.navigate('NewInvite', {
            edit: false,
            invite: {},
            title: 'New Invite',
          });
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'user' : 'user-o'}
            type={'font-awesome'}
            size={20}
            color={color.themeNight}
          />
        ),
        tabBarOnPress: ({ navigation }) => {
          showEditProfileButton = true;
          (showBackToHomeButton = false),
            navigation.navigate('Profile', { title: 'Profile' });
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);

function getHeaderRight(navigation) {
  if (showEditProfileButton) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <View style={{ marginRight: 10 }}>
          <Icon
            name={'ios-settings'}
            type={'ionicon'}
            color={color.themeNight}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

function getHeaderLeft(navigation) {
  if (showBackToHomeButton) {
    return (
      <TouchableOpacity
        onPress={() => {
          showBackToHomeButton = false;
          navigation.navigate('Home');
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Icon
            name={'ios-arrow-back'}
            type={'ionicon'}
            color={color.themeNight}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const MainStack = createStackNavigator({
  Tab: {
    screen: MainTab,
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;
      const { params } = state.routes[state.index];
      return {
        title: params ? params.title : 'Home',
        headerRight: getHeaderRight(navigation),
        headerLeft: params ? params.headerLeft : getHeaderLeft(navigation),
        headerStyle,
        headerTintColor: color.themeNight,
      };
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'Edit Profile',
      headerStyle,
      headerTintColor: color.themeNight,
    },
  },
  Attendees: {
    screen: Attendees,
    navigationOptions: {
      title: 'Attendees',
      headerStyle,
      headerTintColor: color.themeNight,
    },
  },
});

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
