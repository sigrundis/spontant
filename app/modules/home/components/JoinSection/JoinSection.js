import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import { actions as authActions } from '../../../auth/index';
const { getAttendeesInInvite } = authActions;
import styles from './styles';
import { theme } from '../../index';
const { color, normalize, fontFamily } = theme;

class JoinSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetchingAttendeesWithInfo: true, attendeesWithInfo: [] };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.attendees !== this.props.attendees) {
      const { inviteId, attendees } = this.props;
      this.fetchAttendeesWitInfo(attendees, inviteId);
    }
  }
  componentDidMount() {
    const { inviteId, attendees } = this.props;
    this.fetchAttendeesWitInfo(attendees, inviteId);
  }

  fetchAttendeesWitInfo(attendees, inviteId) {
    const { getAttendeesInInvite } = this.props;
    if (attendees) {
      this.setState({
        fetchingAttendeesWithInfo: true,
      });
      getAttendeesInInvite(
        inviteId,
        this.onFindAttendeesSuccess,
        this.onFindAttendeesError
      );
    } else {
      this.setState({
        attendeesWithInfo: [],
        fetchingAttendeesWithInfo: false,
      });
    }
  }

  onFindAttendeesSuccess = (data) => {
    this.setState({
      attendeesWithInfo: data,
      fetchingAttendeesWithInfo: false,
    });
  };

  onFindAttendeesError = (error) => {
    this.setState({
      attendeesWithInfo: [],
      fetchingAttendeesWithInfo: false,
    });
    console.error('on find attendees error', error);
  };

  renderAttendees(inviteColor) {
    const { navigation } = this.props;
    const { attendeesWithInfo } = this.state;
    let arrayToMap = [];
    if (attendeesWithInfo.length > 2) {
      arrayToMap.push(0, 1, 2);
    } else if (attendeesWithInfo.length > 1) {
      arrayToMap.push(0, 1);
    } else if (attendeesWithInfo.length > 0) {
      arrayToMap.push(0);
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Be the first one to join!</Text>
        </View>
      );
    }
    const userImages = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {arrayToMap.map((index) => {
          const { userimage } = attendeesWithInfo[index];
          if (!userimage) {
            return (
              <View
                key={index}
                style={[
                  styles.imageIconContainer,
                  { marginLeft: index > 0 ? -5 : 0 },
                ]}
              >
                <Icon
                  name={'ios-contact'}
                  type="ionicon"
                  color={inviteColor}
                  size={27}
                />
              </View>
            );
          } else {
            return (
              <View key={index}>
                <ProgressiveImage
                  isCircle
                  source={{ uri: userimage }}
                  thumbnailSource={{
                    uri: userimage.replace('upload/', 'upload/w_50/'),
                  }}
                  style={[styles.image, { marginLeft: index > 0 ? -5 : 0 }]}
                />
              </View>
            );
          }
        })}
        <Text style={[styles.text, { marginLeft: 2 }]}>{`${
          attendeesWithInfo.length
        } ${
          attendeesWithInfo.length > 1 ? 'people' : 'person'
        } have joined!`}</Text>
      </View>
    );

    return (
      <View style={styles.attendees}>
        {userImages}
        {attendeesWithInfo.length > 0 && (
          <Text
            style={[styles.text, { color: inviteColor }]}
            onPress={() =>
              navigation.navigate('Attendees', {
                attendees: attendeesWithInfo,
              })
            }
          >
            See attendees
          </Text>
        )}
      </View>
    );
  }

  renderJoinStatus(inviteColor) {
    const { minAttendees, maxAttendees, joinCount } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name={'ios-people'}
          type="ionicon"
          color={inviteColor}
          size={20}
        />
        <Text
          style={{
            fontSize: normalize(12),
            lineHeight: normalize(17),
            color: joinCount < minAttendees ? color.themeRed : color.themeGreen,
            fontFamily: fontFamily.regular,
            padding: 4,
          }}
        >{`${joinCount} /${
          maxAttendees !== 'unlimited' ? ` ${maxAttendees}` : ''
        }`}</Text>
        {maxAttendees === 'unlimited' && (
          <Icon
            name={'ios-infinite'}
            type="ionicon"
            color={inviteColor}
            size={18}
          />
        )}
      </View>
    );
  }

  renderJoinBar(inviteColor) {
    let { maxAttendees, joinCount } = this.props;
    maxAttendeesForCalculations =
      maxAttendees === 'unlimited' ? joinCount + 10 : maxAttendees;
    const joinPercentage = (joinCount / maxAttendeesForCalculations) * 100;
    const availableSpotsPercentage = 100 - joinPercentage;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.bar}>
          <View
            style={[
              styles.joined,
              {
                width: `${joinPercentage}%`,
                backgroundColor: inviteColor,
              },
            ]}
          />
          <View
            style={[
              styles.avaibaleSpots,
              {
                width: `${availableSpotsPercentage}%`,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  renderActivationCounter() {
    let { minAttendees, joinCount } = this.props;
    const howManyNeeded = minAttendees - joinCount;
    if (howManyNeeded < 1) return null;
    return (
      <View style={styles.activationMessage}>
        <Text
          style={[styles.text, styles.activationText]}
        >{`${howManyNeeded} more ${
          howManyNeeded < 2 ? 'guest' : 'guests'
        } needed to activate event.`}</Text>
      </View>
    );
  }

  render() {
    let { minAttendees, joinCount } = this.props;
    const { fetchingAttendeesWithInfo } = this.state;
    const inviteColor =
      joinCount < minAttendees ? color.themeRed : color.themeGreen;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {this.renderActivationCounter()}
          {fetchingAttendeesWithInfo ? (
            <AnimatedEllipsis style={styles.loadingAttendees} />
          ) : (
            this.renderAttendees(inviteColor)
          )}
          <View style={styles.bottom}>
            {this.renderJoinBar(inviteColor)}
            {this.renderJoinStatus(inviteColor)}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { getAttendeesInInvite }
)(JoinSection);
