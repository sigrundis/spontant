import React from 'react';
import SvgLogo from '../SvgLogo';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <SvgLogo height={150} width={150} />
          <Text style={styles.title}>Spontant</Text>
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      </View>
    );
  }
}
