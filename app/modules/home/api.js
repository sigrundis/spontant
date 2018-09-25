// In this file, we will be creating several functions that interacts with the Firebase API to carry out our CRUD operations.
import { database } from '../../config/firebase';

export function addQuote(quote, callback) {
  const { userId } = quote;
  const newQuoteRef = database
    .ref()
    .child('quotes')
    .push();
  const newQuoteKey = newQuoteRef.key;

  quote.id = newQuoteKey;

  // Write the new quote data simultaneously in the quotes list and the user's quotes list.
  let updates = {};
  updates['/quotes/' + newQuoteKey] = quote;
  updates['/user-quotes/' + userId + '/' + newQuoteKey] = quote;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, quote, null))
    .catch((error) => callback(false, null, error));
}

export function getQuotes(callback) {
  const quotesRef = database.ref('quotes');

  //start listening for new data
  quotesRef.on('value', function(snapshot) {
    callback(true, snapshot, null);
  });
}

export function updateQuote(quote, callback) {
  const { id, userId } = quote;

  let updates = {};
  updates['quotes/' + id] = quote;
  updates['/user-quotes/' + userId + '/' + id] = quote;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, quote, null))
    .catch((error) => callback(false, null, error));
}

export function deleteQuote(quote, callback) {
  const { id, userId } = quote;

  let updates = {};
  updates['quotes/' + id] = null;
  updates['/user-quotes/' + userId + '/' + id] = null;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, quote, null))
    .catch((error) => callback(false, null, error));
}

export function toggleLove(data, callback) {
  const { quote, uid } = data;
  const quoteRef = database.ref('quotes/' + quote.id);

  quoteRef.transaction(
    function(quote) {
      if (quote) {
        if (quote.loves && quote.loves[uid]) {
          quote.loveCount--;
          quote.loves[uid] = null;
        } else {
          quote.loveCount++;
          if (!quote.loves) quote.loves = {};
          quote.loves[uid] = true;
        }
      }

      return quote;
    },
    function(error, committed, snapshot) {
      if (error || !committed) callback(false, null, error);
      else callback(true, snapshot.val(), null);
    }
  );
}
