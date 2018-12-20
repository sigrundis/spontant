import * as t from './actionTypes';
import * as api from './api';
import { auth } from '../../config/firebase';

export function register(data, successCB, errorCB) {
  return (dispatch) => {
    api.register(data, function(success, data, error) {
      if (success) {
        dispatch({ type: t.LOGGED_IN, data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function createUser(user, successCB, errorCB) {
  return (dispatch) => {
    api.createUser(user.uid, user, function(success, data, error) {
      if (success) {
        dispatch({ type: t.LOGGED_IN, data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function updateUser(user, oldEmail, password, successCB, errorCB) {
  return (dispatch) => {
    api.updateUser(user, oldEmail, password, function(success, data, error) {
      if (success) {
        dispatch({ type: t.UPDATE_USER, data: user });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function login(data, successCB, errorCB) {
  return (dispatch) => {
    api.login(data, function(success, data, error) {
      if (success) {
        if (data.exists) dispatch({ type: t.LOGGED_IN, data: data.user });
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}

export function resetPassword(data, successCB, errorCB) {
  return (dispatch) => {
    api.resetPassword(data, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}

export function signOut(successCB, errorCB) {
  return (dispatch) => {
    api.signOut(function(success, data, error) {
      if (success) {
        dispatch({ type: t.LOGGED_OUT });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function getUserById(userId, successCB, errorCB) {
  return (dispatch) => {
    api.getUserById(userId, function(success, data, error) {
      if (success) {
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}

export function getAttendeesInInvite(inviteId, successCB, errrorCB) {
  return (dispatch) => {
    api.getAttendeesInInvite(inviteId, function(success, data, error) {
      if (success) {
        successCB(data);
      } else if (error) errorCB(error);
    });
  };
}

export function signUpWithFacebook(facebookToken, successCB, errorCB) {
  return (dispatch) => {
    api.signUpWithFacebook(facebookToken, function(success, data, error) {
      if (success) {
        dispatch({ type: t.LOGGED_IN, data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

//Sign user in using Facebook
export function signInWithFacebook(facebookToken, successCB, errorCB) {
  return (dispatch) => {
    api.signInWithFacebook(facebookToken, function(success, data, error) {
      console.log('success', success);
      console.log('error', error);
      if (success) {
        dispatch({ type: t.LOGGED_IN, data });
        successCB();
      } else if (error) errorCB(error);
    });
  };
}

export function checkLoginStatus(callback) {
  console.log('check login status');
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      console.log('on auth state changed', user);
      let isLoggedIn = user !== null;
      if (isLoggedIn) {
        api.getUser(user, function(success, { exists, user }, error) {
          if (success) {
            if (exists) dispatch({ type: t.LOGGED_IN, data: user });
            callback(exists, isLoggedIn);
          } else if (error) {
            console.log('error in check login status', error);
            //unable to get user
            dispatch({ type: t.LOGGED_OUT });
            callback(false, false);
          }
        });
      } else {
        dispatch({ type: t.LOGGED_OUT });
        callback(false, isLoggedIn);
      }
    });
  };
}
