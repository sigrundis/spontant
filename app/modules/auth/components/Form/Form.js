import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { isEmpty, validate } from '../../utils/validate';
import styles from './styles';
import InputField from '../../../../components/InputField';
import { theme } from '../../';
const { color } = theme;

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { fields, error } = props;
    this.state = this.createState(fields, error);

    //bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { error } = props;
    if (!isEmpty(error.general)) {
      state.error.general = error.general;
    }
    return state;
  }
  createState(fields, error) {
    //create the state
    const state = {};
    fields.forEach((field) => {
      let { key, type, value } = field;
      state[key] = { type, value };
    });
    state.error = error;
    return state;
  }

  onSubmit() {
    const data = this.state;
    const result = validate(data);
    this.setState({ error: result.error });
    if (result.success) {
      this.props.onSubmit(this.extractData(data));
    }
  }

  extractData(data) {
    const retData = {};
    Object.keys(data).forEach(function(key) {
      if (key !== 'error') {
        let { value } = data[key];
        retData[key] = value;
      }
    });
    return retData;
  }

  onChange(key, text) {
    const state = this.state;
    state[key]['value'] = text;
    this.setState(state);
  }

  render() {
    const { isLoading, fields, buttonTitle, onForgotPassword } = this.props;
    const { error } = this.state;
    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator animating={true} />
          </View>
        )}
        {!isEmpty(error.general) && (
          <Text style={styles.errorText}>{`${error.general}`}</Text>
        )}

        {fields.map((field) => {
          const {
            key,
            label,
            placeholder,
            autoFocus,
            secureTextEntry,
            keyboardType,
            multiline,
          } = field;

          return (
            <View key={key}>
              <InputField
                showLabel={true}
                label={label}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={(text) => this.onChange(key, text)}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputContainer}
                placeholderTextColor={color.grey}
                keyboardType={keyboardType}
                value={this.state[key].value}
                multiline={multiline}
                validationErrors={!isEmpty(error[key]) ? [error[key]] : []}
              />
            </View>
          );
        })}
        <Button
          raised
          title={buttonTitle}
          borderRadius={0}
          containerViewStyle={styles.containerView}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this.onSubmit}
        />
        {this.props.onForgotPassword !== null && (
          <Text style={styles.forgotText} onPress={onForgotPassword}>
            Forgot password?
          </Text>
        )}
      </View>
    );
  }
}

Form.propTypes = {
  // fields: PropTypes.object,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Form.defaultProps = {
  onForgotPassword: null,
  placeholderTextColor: 'grey',
};

export default Form;
