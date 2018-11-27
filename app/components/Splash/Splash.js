import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={{ uri: '../../assets/icon.png' }}
          />
          <Text style={styles.title}>Invites</Text>
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      </View>
    );
  }
}
