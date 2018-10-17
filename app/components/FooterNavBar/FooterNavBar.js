import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavButton from '../NavButton';
import styles from './styles';
import { color } from '../../styles/theme';

class FooterNavBar extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    Actions.pop();
  }

  renderAddButton(props) {
    return (
      <NavButton
        style={styles.button}
        onPress={Actions.NewInvite}
        name={'plus'}
        type={'entypo'}
        color={color.black}
      />
    );
  }

  render() {
    return (
      <View onPress={this.onPress} style={styles.container}>
        {this.renderAddButton()}
      </View>
    );
  }
}

export default FooterNavBar;
