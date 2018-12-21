import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from '../../index';
const { createUser } = auth;

import Form from '../../components/Form';

const fields = [
  {
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
  {
    key: 'displayname',
    label: 'Display name',
    placeholder: 'Display name',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'text',
  },
];

const error = {
  general: '',
  username: '',
};

class CompleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    const { navigation } = this.props;
    this.setState({ error }); //clear out error messages
    //attach user id
    const user = navigation.getParam('user', {});
    data.uid = user.uid;
    data.email = user.email;
    this.props.createUser(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    this.props.navigation.navigate('Home');
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }

    this.setState({ error: errObj });
  }

  render() {
    return (
      <Form
        fields={fields}
        onSubmit={this.onSubmit}
        buttonTitle={'CONTINUE'}
        error={this.state.error}
      />
    );
  }
}

export default connect(
  null,
  { createUser }
)(CompleteProfile);
