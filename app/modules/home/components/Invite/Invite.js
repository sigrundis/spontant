import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
} from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import { connect } from 'react-redux';

import { actions, theme } from '../../index';
import { Actions } from 'react-native-router-flux';

const { deleteInvite, toggleLove } = actions;
const { normalize, color } = theme;

class Invite extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.onOption = this.onOption.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggleLove = this.onToggleLove.bind(this);
    this.renderLoveButton = this.renderLoveButton.bind(this);
  }

  onOption() {
    const { invites, index } = this.props;
    const invite = invites[index];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) Actions.NewInvite({ edit: true, invite });
        else if (buttonIndex === 1) this.onDelete();
      }
    );
  }

  onDelete() {
    const { invites, index } = this.props;
    const invite = invites[index];

    this.props.deleteInvite(invite, (error) => alert(error.message));
  }

  onToggleLove() {
    const { user, invites, index } = this.props;
    const invite = invites[index];

    const data = { invite, uid: user.uid };

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
              color={color.themeRed}
              size={normalize(20)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderLoveButton() {
    const { user, invites, index } = this.props;
    const invite = invites[index];
    const { attendees } = invite;

    return (
      <TouchableOpacity onPress={this.onToggleLove}>
        <View style={styles.buttonContainer}>
          <Icon
            name={
              attendees && attendees[user.uid] ? 'md-heart' : 'md-heart-outline'
            }
            type="ionicon"
            color="#fff"
            iconStyle={{ height: normalize(20) }}
            size={normalize(20)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderJoinButton() {
    const { user, invites, index } = this.props;
    const invite = invites[index];
    const { attendees } = invite;

    return (
      <View style={styles.joinButton}>
        <Button
          onPress={this.onToggleLove}
          title={attendees && attendees[user.uid] ? 'Cansel join' : 'Join'}
          color="#fff"
        />
      </View>
    );
  }

  render() {
    const { user, invites, index } = this.props;
    const invite = invites[index];
    const {
      title,
      description,
      minAttendees,
      maxAttendees,
      author,
      time,
      userId,
      joinCount,
    } = invite;

    return (
      <View style={[styles.container]}>
        <View style={styles.wrapper}>
          <View style={[styles.invite]}>
            <View style={styles.left}>
              <Text style={[styles.author]}>{author.name}</Text>
              <Text style={[styles.publishedAt]}>{`Created an invite ${moment(
                time
              ).fromNow()}`}</Text>
              <Text
                style={[styles.publishedAt]}
              >{`for minimum ${minAttendees} and maximum ${maxAttendees} persons.`}</Text>
            </View>
            {user.uid === userId && this.renderOptionButton()}
          </View>
          <View style={styles.left}>
            <Text style={[styles.title]}>{title}</Text>
            <Text style={[styles.description]}>{description}</Text>
            <Text
              style={[styles.description]}
            >{`${joinCount}/${maxAttendees} have joined.`}</Text>
          </View>
          <View style={styles.bottom}>{this.renderJoinButton()}</View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.authReducer.user,
    invites: state.homeReducer.invites,
  };
}

export default connect(
  mapStateToProps,
  { deleteInvite, toggleLove }
)(Invite);
