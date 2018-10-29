import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isEmpty } from '../../../auth/utils/validate';
import styles from './styles';
import { actions as authActions } from '../../../auth/index';
const { updateUser } = authActions;
import { theme } from '../../index';
const { color } = theme;

const error = {};

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { isFocused, user } = props;
    if (!isFocused) return null;
    // If the user was creating a new invite last time they were using the input fields
    // but didn't save, we want to keep their input, i.e. don't change the state.
    const { displayname } = user;
    return {
      displayName: displayname,
    };
  }

  onSubmit() {
    const { displayName } = this.state;
    const { navigation, user } = this.props;
    console.log('user', user);
    user['displayname'] = displayName;
    this.setState({ error: error }); //clear out error messages
    this.props.updateUser(user, this.onSuccess, this.onError);
  }

  onSuccess = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  };

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

  onChangeDisplayName(displayName) {
    console.log('change name');
    this.setState({ displayName });
  }

  getFields() {
    const { displayName } = this.state;
    return [
      {
        key: 'displayName',
        label: 'Display name',
        placeholder: 'Display name',
        autoFocus: false,
        secureTextEntry: false,
        value: displayName,
        keyboardType: 'default',
      },
    ];
  }

  renderCloseButton(props) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.closeButton}>
          <Icon name={'md-close'} type={'ionicon'} color={color.black} />
        </View>
      </TouchableOpacity>
    );
  }

  renderInputs() {
    const { error } = this.state;
    const { placeholderTextColor } = this.props;
    const showLabel = false;
    const onChangeText = {
      displayName: this.onChangeDisplayName,
    };

    return (
      <View style={styles.container}>
        {this.getFields().map((field) => {
          const {
            key,
            label,
            placeholder,
            autoFocus,
            secureTextEntry,
            value,
            keyboardType,
            multiline,
          } = field;
          return (
            <View style={styles.FormInput} key={key}>
              {showLabel && <FormLabel>{label}</FormLabel>}
              <FormInput
                autoCapitalize="none"
                clearButtonMode="while-editing"
                underlineColorAndroid={'#fff'}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={onChangeText[key]}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputContainer}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                value={value}
                multiline={multiline}
              />
              {!isEmpty(error) && (
                <FormValidationMessage>{error[key]}</FormValidationMessage>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCloseButton()}
        {this.renderInputs()}
        <Button
          raised
          title="SAVE CHANGES"
          borderRadius={10}
          containerViewStyle={styles.containerView}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this.onSubmit}
        />
        <View style={styles.bottomContainer} />
        <KeyboardSpacer />
      </View>
    );
  }
}

EditProfile.defaultProps = {
  placeholderTextColor: 'grey',
};

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
  };
}

export default withNavigationFocus(
  connect(
    mapStateToProps,
    { updateUser }
  )(EditProfile)
);
