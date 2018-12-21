import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { createRootNavigator } from './app/config/navigation';
import NavigationService from './NavigationService';
import store from './app/redux/store';
import Splash from './app/components/Splash/Splash';
import { checkLoginStatus } from './app/modules/auth/actions';

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      checkedLogin: false,
      isLoggedIn: false,
      exist: false,
    };
  }

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts([
      { RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf') },
      { RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf') },
      { RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf') },
      { RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf') },
      { RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf') },
      { YummoBold: require('./app/assets/fonts/Yummo_Bold.otf') },
      { YummoLight: require('./app/assets/fonts/Yummo_Light.otf') },
      { YummoRegular: require('./app/assets/fonts/Yummo_Regular.otf') },
    ]);

    await Promise.all([...fontAssets]);
  }

  componentDidMount() {
    store.dispatch(
      checkLoginStatus((exist, isLoggedIn) => {
        this.setState({
          checkedLogin: true,
          exist,
          isLoggedIn,
        });
      })
    );
  }

  render() {
    const { isReady, checkedLogin, isLoggedIn, exist } = this.state;
    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    if (!checkedLogin) return <Splash />;

    const Layout = createRootNavigator(isLoggedIn && exist);
    return (
      <Provider store={store}>
        <Layout
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
