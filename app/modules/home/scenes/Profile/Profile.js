import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Text } from 'react-native-elements';
import { actions as auth } from '../../../auth/index';
const { signOut } = auth;
import styles from './styles';
import { theme } from '../../index';
const { color } = theme;

class Profile extends Component {
  onPressSignOut = (screen) => {
    const { navigation } = this.props;
    this.props.signOut(
      this.onSuccessSignOut.bind(this),
      this.onErrorSignOut.bind(this)
    );
  };

  onSuccessSignOut() {
    const { navigation } = this.props;
    navigation.navigate('LoggedOut');
  }

  onErrorSignOut(error) {
    alert('Oops!', error.message);
  }

  render() {
    const { user } = this.props;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={user && user.displayname}>
          <View
            style={{
              backgroundColor: '#bcbec1',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 28 }}>
              {user &&
                user.displayname
                  .split(' ')
                  .map((x) => x[0])
                  .join('')}
            </Text>
          </View>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title="SIGN OUT"
            onPress={this.onPressSignOut}
          />
        </Card>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default connect(
  mapStateToProps,
  { signOut }
)(Profile);
