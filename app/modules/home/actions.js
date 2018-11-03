import * as t from './actionTypes';
import * as api from './api';

// Add Invite - CREATE (C)
export function addInvite(invite, successCB, errorCB) {
  return (dispatch) => {
    api.addInvite(invite, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}

// Get Invites - READ (R)
export function getInvites(errorCB) {
  return (dispatch) => {
    dispatch({ type: t.LOADING_INVITES });
    api.getInvites(function(success, data, error) {
      if (success) dispatch({ type: t.INVITES_AVAILABLE, data });
      else if (error) errorCB(error);
    });
  };
}

// Update Invite - UPDATE (U)
export function updateInvite(invite, successCB, errorCB) {
  return (dispatch) => {
    api.updateInvite(invite, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}

// Delete Invite - DELETE (D)
export function deleteInvite(invite, errorCB) {
  return (dispatch) => {
    api.deleteInvite(invite, function(success, data, error) {
      if (error) errorCB(error);
    });
  };
}

// Like/Unlike
export function addJoin(data, errorCB) {
  return (dispatch) => {
    dispatch({ type: t.LOADING_INVITES });
    api.addJoin(data, function(success, data, error) {
      if (error) errorCB(error);
    });
  };
}

export function updateUser(user, successCB, errorCB) {
  return (dispatch) => {
    api.updateUser(user, function(success, data, error) {
      if (success) {
        dispatch();
        successCB();
      } else if (error) errorCB(error);
    });
  };
}
