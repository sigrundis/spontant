import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';

const colors = [
  '#EB623A',
  '#FF553F',
  '#4F6384',
  '#E9C9B4',
  '#F7CDC2',
  '#EFDFC8',
  '#4E57D4',
  '#E6A78C',
  '#FE7D72',
  '#5096CF',
  '#F99B70',
  '#646A6A',
];

class NewQuote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.edit ? props.quote.text : '',
      color: props.edit ? props.quote.color : colors[0],
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
  }

  componentDidMount() {
    Actions.refresh({ showButton: false });
  }

  onChangeText(text) {
    const { color } = this.state;

    const showButton = text.trim().length > 0;

    const edit = this.props.edit; //check if in edit mode

    let data = { text, color, edit };

    if (edit) data['quote'] = this.props.quote;

    this.setState({ text });

    Actions.refresh({ showButton, data });
  }

  onSelectColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextInput
            multiline={true}
            onChangeText={this.onChangeText}
            placeholder={'Enter Quote'}
            style={[styles.textInput, { backgroundColor: this.state.color }]}
            value={this.state.text}
            autoFocus={true}
            placeholderTextColor={'#ccc'}
          />
        </View>
        <View style={styles.bottomContainer}>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {colors.map((color, idx) => {
              return (
                <TouchableHighlight
                  key={idx}
                  underlayColor={'transparent'}
                  onPress={() => this.onSelectColor(color)}
                >
                  <View
                    style={[
                      styles.color,
                      { backgroundColor: color },
                      this.state.color === color && {
                        borderWidth: 3,
                        borderColor: 'white',
                      },
                    ]}
                  />
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default connect(
  null,
  {}
)(NewQuote);
