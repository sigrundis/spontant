import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { actions as home } from '../../index';
const { getInvites } = home;

import styles from './styles';
import Invite from '../../components/Invite';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getInvites((error) => alert(error.message));
  }

  renderItem({ item, index }) {
    const { navigation } = this.props;
    return <Invite navigation={navigation} index={index} />;
  }

  render() {
    const { isLoading, invites } = this.props;
    if (isLoading) {
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
            data={invites}
            renderItem={this.renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.homeReducer.isLoading,
    invites: state.homeReducer.invites,
  };
}

export default connect(
  mapStateToProps,
  { getInvites }
)(Home);
