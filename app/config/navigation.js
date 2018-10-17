import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import DrawerMenu from '../modules/home/scenes/DrawerMenu';
import transitionConfig from '../modules/home/utils/navigationAnimation';
import Home from '../modules/home/scenes/Home';
import Welcome from '../modules/auth/scenes/Welcome';

// Manifest of possible screens
const RootStack = createStackNavigator(
  {
    Home: { screen: Home },
    Signout: { screen: Welcome },
  },
  // Default config for all screens
  {
    transitionConfig,
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2E3859',
        paddingRight: 25,
        paddingLeft: 10,
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        color: '#FFF',
      },
      headerRight: (
        <Icon
          name="ios-menu"
          type="ionicon"
          color="#FFF"
          size={35}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    }),
  }
);

const Drawer = createDrawerNavigator(
  {
    Main: { screen: RootStack },
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: 300,
  }
);

export default Drawer;
