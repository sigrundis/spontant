import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import JoinBar from '../JoinBar';
import styles from './styles';
import { connect } from 'react-redux';
import { actions, theme } from '../../index';
import { actions as authActions } from '../../../auth/index';
const { getUserById } = authActions;
const { deleteInvite, addJoin } = actions;
const { normalize, color } = theme;

class Invite extends React.Component {
  constructor() {
    super();
    this.state = { fetchingInviter: true };
    this.onOption = this.onOption.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onClickJoin = this.onClickJoin.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.invites !== this.props.invites) {
      const { invites, index, getUserById } = this.props;
      const invite = invites[index];
      const { userId } = invite;
      getUserById(userId, this.onFindUserSuccess, this.onFindUserError);
    }
  }
  componentDidMount() {
    const { invites, index, getUserById } = this.props;
    const invite = invites[index];
    const { userId } = invite;
    getUserById(userId, this.onFindUserSuccess, this.onFindUserError);
  }

  onFindUserSuccess = (data) => {
    this.setState({ fetchingInviter: false, inviter: data.user });
  };

  onFindUserError = (error) => {
    this.setState({ fetchingInviter: false });
    console.error('Error finding user', error);
  };

  onOption() {
    const { invites, index, navigation } = this.props;
    const invite = invites[index];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0)
          navigation.navigate('NewInvite', {
            title: 'Edit Invite',
            edit: true,
            invite,
          });
        else if (buttonIndex === 1) this.onDelete();
      }
    );
  }

  onDelete() {
    const { invites, index } = this.props;
    const invite = invites[index];
    this.props.deleteInvite(invite, (error) => alert(error.message));
  }

  onClickJoin() {
    const { user, invites, index } = this.props;
    const invite = invites[index];
    const data = { invite, uid: user.uid };
    this.props.addJoin(data, (error) => alert(error.message));
  }

  /**
   * TODO: Change this when user can upload image.
   */
  renderUserImage() {
    const { inviter, fetchingInviter } = this.state;
    if (fetchingInviter)
      return <ActivityIndicator size="small" color={color.grey} />;
    const { userimage } = inviter;
    return userimage ? (
      <Image
        source={{ uri: userimage }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    ) : (
      <Icon name={'ios-contact'} type="ionicon" color={color.grey} size={50} />
    );
  }

  renderOptionButton() {
    return (
      <View style={styles.right}>
        <TouchableOpacity onPress={this.onOption}>
          <View style={styles.buttonContainer}>
            <Icon
              name={'ios-more'}
              type="ionicon"
              color={color.themeRed}
              size={normalize(20)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderJoinButton(buttonColor) {
    const { user, invites, index } = this.props;
    const invite = invites[index];
    const { attendees } = invite;
    const isSelected = attendees && attendees[user.uid];
    return (
      <View
        style={[
          styles.joinButton,
          {
            backgroundColor: isSelected ? color.white : buttonColor,
            borderColor: isSelected ? buttonColor : color.white,
          },
        ]}
      >
        <Button
          onPress={this.onClickJoin}
          title={attendees && attendees[user.uid] ? 'Cancel join' : 'Join'}
          color={attendees && attendees[user.uid] ? buttonColor : color.white}
        />
      </View>
    );
  }

  renderImage(uri) {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </View>
    );
  }

  render() {
    const { user, invites, index } = this.props;
    const { inviter, fetchingInviter } = this.state;
    const invite = invites[index];
    const {
      title,
      description,
      date,
      minAttendees,
      maxAttendees,
      time,
      image,
      userId,
      joinCount,
    } = invite;
    const buttonColor =
      joinCount < minAttendees ? color.themeRed : color.themeGreen;
    return (
      <View style={[styles.container]}>
        <View style={styles.wrapper}>
          <View style={[styles.invite]}>
            <View style={styles.userImage}>{this.renderUserImage()}</View>
            <View style={styles.left}>
              {fetchingInviter ? (
                <AnimatedEllipsis />
              ) : (
                <Text
                  style={[
                    styles.author,
                    {
                      color:
                        joinCount < minAttendees
                          ? color.themeRed
                          : color.themeGreen,
                    },
                  ]}
                >
                  {inviter.displayname}
                </Text>
              )}
              <Text style={[styles.publishedAt]}>{`Created an invite ${moment(
                time
              ).fromNow()}`}</Text>
            </View>
            {user.uid === userId && this.renderOptionButton()}
          </View>
          <View style={[styles.left, { marginBottom: 10 }]}>
            {image && this.renderImage(image)}
            <Text
              style={[
                styles.title,
                {
                  color:
                    joinCount < minAttendees
                      ? color.themeRed
                      : color.themeGreen,
                },
              ]}
            >
              {title}
            </Text>
            <Text style={styles.date}>
              {date && moment(date).format('LLLL')}
            </Text>
            <Text style={[styles.description]}>{description}</Text>
          </View>
          <JoinBar
            joinCount={joinCount}
            minAttendees={minAttendees}
            maxAttendees={maxAttendees}
          />
          <View style={styles.bottom}>
            {this.renderJoinButton(buttonColor)}
          </View>
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
  { getUserById, deleteInvite, addJoin }
)(Invite);
