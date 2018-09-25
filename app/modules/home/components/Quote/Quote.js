import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import { connect } from 'react-redux';

import { actions, theme } from '../../index';
import { Actions } from 'react-native-router-flux';

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

class Quote extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.onOption = this.onOption.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggleLove = this.onToggleLove.bind(this);

    this.renderLoveButton = this.renderLoveButton.bind(this);
  }

  onOption() {
    const { quotes, index } = this.props;
    const quote = quotes[index];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) Actions.NewQuote({ edit: true, quote });
        else if (buttonIndex === 1) this.onDelete();
      }
    );
  }

  onDelete() {
    const { quotes, index } = this.props;
    const quote = quotes[index];

    this.props.deleteQuote(quote, (error) => alert(error.message));
  }

  onToggleLove() {
    const { user, quotes, index } = this.props;
    const quote = quotes[index];

    const data = { quote, uid: user.uid };

    this.props.toggleLove(data, (error) => alert(error.message));
  }

  renderOptionButton() {
    return (
      <View style={styles.right}>
        <TouchableOpacity onPress={this.onOption}>
          <View style={styles.buttonContainer}>
            <Icon
              name={'md-more'}
              type="ionicon"
              color="#fff"
              size={normalize(20)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderLoveButton() {
    const { user, quotes, index } = this.props;
    const quote = quotes[index];
    const { loves } = quote;

    return (
      <TouchableOpacity onPress={this.onToggleLove}>
        <View style={styles.buttonContainer}>
          <Icon
            name={loves && loves[user.uid] ? 'md-heart' : 'md-heart-outline'}
            type="ionicon"
            color="#fff"
            iconStyle={{ height: normalize(20) }}
            size={normalize(20)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { user, quotes, index } = this.props;
    const quote = quotes[index];
    const { text, author, time, color, userId } = quote;

    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.wrapper,
            { backgroundColor: color, borderColor: color },
          ]}
        >
          <View style={[styles.quote]}>
            <Text style={[styles.text]}>{text}</Text>
            {user.uid === userId && this.renderOptionButton()}
          </View>

          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={[styles.author]}>{author.name}</Text>
              <Text style={[styles.publishedAt]}>{moment(time).fromNow()}</Text>
            </View>
            <View style={styles.right}>{this.renderLoveButton()}</View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
    quotes: state.homeReducer.quotes,
  };
}

export default connect(
  mapStateToProps,
  { deleteQuote, toggleLove }
)(Quote);
