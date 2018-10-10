import React from 'react';
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Modal,
  Tabs,
  Actions,
} from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NewInvite from '../modules/home/scenes/NewInvite';

//Components
import NavButton from '../components/NavButton';
import SaveButton from '../modules/home/components/SaveButton';
import DrawerMenu from '../components/DrawerMenu';

//Import Store, actions
import store from '../redux/store';
import { checkLoginStatus } from '../modules/auth/actions';

import { color, navTitleStyle } from '../styles/theme';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false,
      exist: false, //indicates if user exist in realtime database
    };
  }

  componentDidMount() {
    let _this = this;
    store.dispatch(
      checkLoginStatus((exist, isLoggedIn) => {
        _this.setState({ isReady: true, exist, isLoggedIn });
      })
    );
  }

  renderAddButton(props) {
    return (
      <NavButton
        onPress={Actions.NewInvite}
        name={'plus'}
        type={'entypo'}
        color={color.black}
      />
    );
  }

  renderCloseButton(props) {
    return (
      <NavButton
        onPress={Actions.pop}
        name={'md-close'}
        type={'ionicon'}
        color={color.black}
      />
    );
  }

  renderHamburgerButton(props) {
    return (
      <NavButton
        onPress={Actions.DrawerMenu}
        name={'md-menu'}
        type={'ionicon'}
        color={color.black}
      />
    );
  }

  renderSaveButton(props) {
    if (props.showButton) return <SaveButton data={props.data} />;
    else return null;
  }

  render() {
    if (!this.state.isReady) return <Splash />;

    return (
      <Router>
        <Modal key="wrapper">
          <Scene
            key="root"
            hideNavBar
            navigationBarStyle={{ backgroundColor: '#fff' }}
            titleStyle={navTitleStyle}
            backButtonTintColor={color.black}
          >
            <Stack key="Auth" initial={!this.state.isLoggedIn}>
              <Scene
                key="Welcome"
                component={Welcome}
                title=""
                initial={true}
                hideNavBar
              />
              <Scene
                key="Register"
                component={Register}
                title="Register"
                back
              />
              <Scene
                key="CompleteProfile"
                component={CompleteProfile}
                title="Select Username"
                back={false}
              />
              <Scene key="Login" component={Login} title="Login" />
              <Scene
                key="ForgotPassword"
                component={ForgotPassword}
                title="Forgot Password"
              />
            </Stack>
            <Stack key="Main" initial={this.state.isLoggedIn}>
              <Scene
                key="Home"
                component={Home}
                title="Home"
                initial={true}
                type={ActionConst.REPLACE}
                renderRightButton={this.renderAddButton}
                renderLeftButton={this.renderHamburgerButton}
              />
            </Stack>
          </Scene>

          <Scene
            key="NewInvite"
            navigationBarStyle={{ backgroundColor: '#fff' }}
            titleStyle={navTitleStyle}
            component={NewInvite}
            title="New Invite"
            renderLeftButton={this.renderCloseButton}
            renderRightButton={this.renderSaveButton}
          />
          <Scene
            key="DrawerMenu"
            navigationBarStyle={{ backgroundColor: '#fff' }}
            titleStyle={navTitleStyle}
            component={DrawerMenu}
            title="New Invite"
            renderLeftButton={this.renderCloseButton}
          />
        </Modal>
      </Router>
    );
  }
}
