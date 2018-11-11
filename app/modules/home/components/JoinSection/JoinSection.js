import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import { theme } from '../../index';
const { color, normalize, fontFamily } = theme;

class JoinSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAttendees(inviteColor) {
    const { attendees, navigation } = this.props;
    let attendeesString = '';
    if (attendees.length > 2) {
      attendeesString = `${attendees[0].displayname}, ${
        attendees[1].displayname
      } and ${attendees.length - 2} more ${
        attendees.length - 2 === 1 ? 'is' : 'are'
      } going.`;
    } else if (attendees.length === 2) {
      attendeesString = `${attendees[0].displayname} and  ${
        attendees[1].displayname
      } are going.`;
    } else {
      attendeesString = `${attendees[0].displayname} is going. `;
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>{attendeesString}</Text>
        <Text
          style={[styles.text, { color: inviteColor }]}
          onPress={() =>
            navigation.navigate('Attendees', {
              attendees,
            })
          }
        >
          See more.
        </Text>
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

  render() {
    let { minAttendees, maxAttendees, joinCount } = this.props;
    const inviteColor =
      joinCount < minAttendees ? color.themeRed : color.themeGreen;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text
            style={styles.text}
          >{`Min: ${minAttendees} Max: ${maxAttendees}`}</Text>
          {this.renderAttendees(inviteColor)}
          <View style={styles.bottom}>
            {this.renderJoinBar(inviteColor)}
            {this.renderJoinStatus(inviteColor)}
          </View>
        </View>
      </View>
    );
  }
}

export default JoinSection;
