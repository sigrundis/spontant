import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { connect } from 'react-redux';

import { actions as home, theme } from '../../index';
const { addInvite, updateInvite } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { data } = this.props;
    const { edit } = data;

    if (edit) this.editInvite();
    else this.saveInvite();
  }

  editInvite() {
    let { data } = this.props;
    const { title, color, invite } = data;

    invite['title'] = title;

    this.props.updateInvite(invite, this.onSuccess, this.onError);
  }

  saveInvite() {
    const { data, user } = this.props;
    const { title } = data;
    const { isFacebookUser, displayname, username, email } = user;

    const newInvite = {
      title: title,
      time: Date.now(),
      userId: user.uid,
      joinCount: 0,
      author: {
        isFacebookUser: isFacebookUser || false,
        username: isFacebookUser ? '' : username,
        name: displayname,
        email: email || '',
      },
    };

    this.props.addInvite(newInvite, this.onSuccess, this.onError);
  }

  onSuccess() {
    Actions.pop();
  }

  onError(error) {
    alert(error.message);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.wrapper}>
          <Icon
            name={'md-send'}
            type={'ionicon'}
            size={25}
            iconStyle={styles.icon}
            color={'rgba(0,0,0,.84)'}
          />
        </View>
      </TouchableOpacity>
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
  { addInvite, updateInvite }
)(SaveButton);
