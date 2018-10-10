import * as t from './actionTypes';

let initialState = {
  isLoading: false,
  invites: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOADING_INVITES: {
      const invites = state.invites;

      //show loading signal
      if (invites.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case t.INVITES_AVAILABLE: {
      let { data } = action;
      let invites = [];

      //convert the snapshot (json object) to array
      data.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        invites.push(item);
      });

      invites.reverse();

      return { ...state, invites, isLoading: false };
    }

    case t.LOGGED_OUT: {
      return { ...state, invites: [] };
    }

    default:
      return state;
  }
};

export default homeReducer;
