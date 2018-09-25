import * as t from './actionTypes';

let initialState = {
  isLoading: false,
  quotes: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOADING_QUOTES: {
      const quotes = state.quotes;

      //show loading signal
      if (quotes.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case t.QUOTES_AVAILABLE: {
      let { data } = action;
      let quotes = [];

      //convert the snapshot (json object) to array
      data.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        quotes.push(item);
      });

      quotes.reverse();

      return { ...state, quotes, isLoading: false };
    }

    case t.LOGGED_OUT: {
      return { ...state, quotes: [] };
    }

    default:
      return state;
  }
};

export default homeReducer;
