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
import JoinSection from '../JoinSection';
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
    this.state = {
      fetchingInviter: true,
      fetchedAttendeesCounter: 0,
      fetchingAttendeesWithInfo: true,
      attendeesWithInfo: [],
    };
    this.onOption = this.onOption.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onClickJoin = this.onClickJoin.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.invites !== this.props.invites) {
      const { invites, index, getUserById } = this.props;
      const invite = invites[index];
      const { userId, attendees } = invite;
      getUserById(userId, this.onFindUserSuccess, this.onFindUserError);
      if (attendees) {
        this.setState({
          fetchingAttendeesWithInfo: true,
          attendeesWithInfo: [],
        });
        Object.keys(attendees).map((attendee) =>
          getUserById(
            attendee,
            this.onFindAttendeeSuccess,
            this.onFindAttendeeError
          )
        );
      } else {
        this.setState({
          fetchingAttendeesWithInfo: false,
          fetchedAttendeesCounter: 0,
        });
      }
    }
  }
  componentDidMount() {
    const { invites, index, getUserById } = this.props;
    const invite = invites[index];
    const { userId, attendees } = invite;
    getUserById(userId, this.onFindUserSuccess, this.onFindUserError);
    if (attendees) {
      this.setState({
        fetchingAttendeesWithInfo: true,
      });
      Object.keys(attendees).map((attendee) =>
        getUserById(
          attendee,
          this.onFindAttendeeSuccess,
          this.onFindAttendeeError
        )
      );
    } else {
      this.setState({
        fetchingAttendeesWithInfo: false,
        fetchedAttendeesCounter: 0,
      });
    }
  }

  onFindAttendeeSuccess = (data) => {
    const { invites, index } = this.props;
    const invite = invites[index];
    const { attendees } = invite;
    const numberOfAttendees = Object.keys(attendees).length;
    let { attendeesWithInfo, fetchedAttendeesCounter } = this.state;
    attendeesWithInfo.push(data.user);
    this.setState({
      attendeesWithInfo,
      fetchingAttendeesWithInfo:
        numberOfAttendees !== fetchedAttendeesCounter + 1,
      fetchedAttendeesCounter:
        numberOfAttendees === fetchedAttendeesCounter + 1
          ? 0
          : fetchedAttendeesCounter + 1,
    });
  };

  onFindAttendeeError = (error) => {
    console.error('Error finding user', error);
  };

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
      <Icon name={'ios-contact'} type="ionicon" color={color.grey} size={60} />
    );
  }

  renderOptionButton() {
    const { invites, index } = this.props;
    const invite = invites[index];
    const { joinCount, minAttendees } = invite;
    return (
      <View style={styles.right}>
        <TouchableOpacity onPress={this.onOption}>
          <View style={styles.buttonContainer}>
            <Icon
              name={'ios-more'}
              type="ionicon"
              color={
                joinCount < minAttendees ? color.themeRed : color.themeGreen
              }
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
            backgroundColor: isSelected ? color.white : color.themeGreen,
            borderColor: isSelected ? color.themeRed : color.white,
          },
        ]}
      >
        <Button
          onPress={this.onClickJoin}
          title={attendees && attendees[user.uid] ? 'Cancel join' : 'Join'}
          color={
            attendees && attendees[user.uid] ? color.themeRed : color.white
          }
        />
      </View>
    );
  }

  renderImage(uri) {
    const hasImage = uri && uri !== '';
    return hasImage ? (
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </View>
    ) : null;
  }

  render() {
    const { user, invites, index, navigation } = this.props;
    const {
      inviter,
      fetchingInviter,
      fetchingAttendeesWithInfo,
      attendeesWithInfo,
    } = this.state;
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
            {this.renderImage(image)}
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
          {fetchingAttendeesWithInfo ? (
            <AnimatedEllipsis />
          ) : (
            <JoinSection
              navigation={navigation}
              joinCount={joinCount}
              minAttendees={minAttendees}
              maxAttendees={maxAttendees}
              attendees={attendeesWithInfo}
            />
          )}
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
