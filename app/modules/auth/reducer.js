import { AsyncStorage } from 'react-native';

import * as t from './actionTypes';

let initialState = { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOGGED_IN:
      const user = action.data;
      console.log('logged_in user', user);
      // Save token and data to Asyncstorage
      AsyncStorage.multiSet([['user', JSON.stringify(user)]]);
      return { ...state, isLoggedIn: true, user: user };

    case t.LOGGED_OUT:
      let keys = ['user'];
      AsyncStorage.multiRemove(keys);

      return { ...state, isLoggedIn: false, user: null };

    case t.UPDATE_USER:
      const updatedUser = action.data;
      return { ...state, user: updatedUser };

    default:
      return state;
  }
};

export default authReducer;
