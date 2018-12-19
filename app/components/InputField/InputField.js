import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { color } from '../../styles/theme';

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
      validationErrors,
    } = this.props;
    return (
      <View key={id} style={[styles.container, inputContainerStyle]}>
        {showLabel && (
          <Text
            style={[
              styles.label,
              {
                color:
                  validationErrors.length > 0
                    ? color.themeRed
                    : color.themeGreen,
              },
            ]}
          >
            {label}
          </Text>
        )}
        <TextInput
          style={[
            styles.textInput,
            textInputStyle,
            {
              borderColor:
                validationErrors.length > 0 ? color.themeRed : color.themeGreen,
            },
          ]}
          textAlignVertical="top"
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
        {validationErrors.length > 0 && (
          <View style={styles.errorMessageContainer}>
            {validationErrors.map((errorMessage) => (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ))}
          </View>
        )}
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
  validationErrors: PropTypes.array,
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
  validationErrors: [],
};

export default InputField;
