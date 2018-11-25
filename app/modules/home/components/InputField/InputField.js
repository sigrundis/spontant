import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { theme } from '../../index';
const { color } = theme;

class InputField extends Component {
  render() {
    const {
      id,
      showLabel,
      label,
      autoCapitalize,
      placeholder,
      autoFocus,
      onChangeText,
      secureTextEntry,
      textInputStyle,
      inputContainerStyle,
      placeholderTextColor,
      keyboardType,
      value,
      multiline,
    } = this.props;

    return (
      <View key={id} style={[styles.container, inputContainerStyle]}>
        {showLabel && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={[styles.textInput, textInputStyle]}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          value={value}
          multiline={multiline}
          textInputStyle={styles.passwordInput}
        />
      </View>
    );
  }
}

InputField.propTypes = {
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  textInputStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  multiline: PropTypes.bool,
};

InputField.defaultProps = {
  showLabel: false,
  label: '',
  autoCapitalize: 'none',
  placeholder: '',
  autoFocus: false,
  onChangeText: () => {},
  secureTextEntry: true,
  textInputStyle: {},
  inputContainerStyle: {},
  placeholderTextColor: color.grey,
  keyboardType: 'default',
  value: '',
  multiline: false,
};

export default InputField;
