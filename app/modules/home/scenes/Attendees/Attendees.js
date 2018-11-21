import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import { theme } from '../../index';
const { color } = theme;

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderProfileImage(attendee) {
    const { userimage } = attendee;
    return userimage ? (
      <Image
        source={{ uri: userimage }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    ) : (
      <Icon name={'ios-contact'} type="ionicon" color={color.grey} size={60} />
    );
  }

  renderAttendee(attendee) {
    return (
      <View key={attendee.uid} style={styles.attendee}>
        {this.renderProfileImage(attendee)}
        <View style={styles.userInfo}>
          <Text style={styles.displayname}>{attendee.displayname}</Text>
          <Text style={styles.username}>{attendee.username}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const attendees = navigation.getParam('attendees', []);
    return (
      <View style={{}}>
        <ScrollView>
          {attendees.map((attendee) => this.renderAttendee(attendee))}
        </ScrollView>
      </View>
    );
  }
}

export default Attendees;
