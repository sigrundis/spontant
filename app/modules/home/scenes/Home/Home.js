import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as home } from '../../index';
const { getQuotes } = home;

import { actions as auth, theme } from '../../../auth/index';
const { signOut } = auth;
const { color } = theme;

import styles from './styles';
import Quote from '../../components/Quote';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.renderItem = this.renderItem.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    this.props.getQuotes((error) => alert(error.message));
  }

  onSignOut() {
    this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
  }

  onSuccess() {
    Actions.Auth();
  }

  onError(error) {
    Alert.alert('Oops!', error.message);
  }

  renderItem({ item, index }) {
    return <Quote index={index} />;
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            ref="listRef"
            data={this.props.quotes}
            renderItem={this.renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            raised
            borderRadius={4}
            title={'LOG OUT'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={this.onSignOut}
          />
        </View>
      );
    }
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.homeReducer.isLoading,
    quotes: state.homeReducer.quotes,
  };
}

export default connect(
  mapStateToProps,
  { getQuotes, signOut }
)(Home);
