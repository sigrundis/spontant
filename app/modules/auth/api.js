import {
  auth,
  database,
  emailAuthProvider,
  authObj,
} from '../../config/firebase';
import axios from 'axios';
const imageSize = 300;

//Register the user using email and password
export function register(data, callback) {
  const { email, password, username, displayname } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((resp) =>
      createUser(
        resp.user.uid,
        { username, displayname, uid: resp.user.uid, email },
        callback
      )
    )
    .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser(userId, data, callback) {
  console.log('tries to create user');
  database
    .ref('users')
    .child(userId)
    .set({ ...data })
    .then(() => callback(true, data, null)) //return
    .catch((error) => callback(false, null, { message: error }));
}

function reauthenticate(currentPassword) {
  var user = auth.currentUser;
  var cred = emailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateAndRetrieveDataWithCredential(cred);
}

export function updateUser(user, oldEmail, password, callback) {
  const { uid, email } = user;
  let updates = {};
  updates['users/' + uid] = user;

  reauthenticate(password)
    .then(() => {
      var user = auth.currentUser;
      user
        .updateEmail(email)
        .then(() => {
          database
            .ref()
            .update(updates)
            .then(() => callback(true, user, null))
            .catch((error) => callback(false, null, error));
        })
        .catch((error) => {
          callback(false, null, error);
        });
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

//Sign the user in with their email and password
export function login(data, callback) {
  const { email, password } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((resp) => getUser(resp.user, callback))
    .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
  database
    .ref('users')
    .child(user.uid)
    .once('value')
    .then(function(snapshot) {
      console.log('snapshot.val() from get user', snapshot.val());
      const exists = snapshot.val() !== null;
      //if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) user = snapshot.val();
      const data = { exists, user };
      callback(true, data, null);
    })
    .catch((error) => callback(false, null, error));
}

export function getUserById(userId, callback) {
  database
    .ref('users')
    .child(userId)
    .once('value')
    .then(function(snapshot) {
      const exists = snapshot.val() !== null;

      //if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) user = snapshot.val();

      const data = { exists, user };
      callback(true, data, null);
    })
    .catch((error) => callback(false, null, error));
}

export const getAttendeesInInvite = (inviteId, callback) => {
  database.ref(`/invites/${inviteId}`).on('value', (snapshots) => {
    const values = snapshots.val() || {};
    const attendeesList = [];
    const attendees = values.attendees;
    if (!attendees) {
      callback(true, attendeesList, null);
    } else {
      const attendeeIds = Object.keys(attendees);
      const promises = attendeeIds.map((uid) =>
        database
          .ref('users')
          .child(uid)
          .once('value')
      );
      Promise.all(promises)
        .then((results) => {
          results.forEach((result) => {
            attendeesList.push(result.val());
          });
          callback(true, attendeesList, null);
        })
        .catch((error) => callback(false, null, error));
    }
  });
};

//Send Password Reset Email
export function resetPassword(data, callback) {
  const { email } = data;
  auth
    .sendPasswordResetEmail(email)
    .then((user) => callback(true, null, null))
    .catch((error) => callback(false, null, error));
}

export function signOut(callback) {
  auth
    .signOut()
    .then(() => {
      if (callback) callback(true, null, null);
    })
    .catch((error) => {
      if (callback) callback(false, null, error);
    });
}

/*
NOTE! SignInWithFacebook to be changed.
For now we always use signUpWithFacebook but it would be more ideal to 
check first if the user already exists and if not create it. 
But when auth.signInAndRetrieveDataWithCredential is called it triggers
auth.onAuthStateChanged which is called in actions.js and triggers
rerendering of the app before signInWithFacebook is able to finish to
both check if the user exists and create the user with async function.
TODO: Find a way so that signInAndRretrieveDataWithCredential can wait
for async func (to check if the user exists) inside the then and return the
output from another async func (createUser).
*/

//Sign user up using Facebook
export function signUpWithFacebook(fbToken, callback) {
  const credential = authObj.FacebookAuthProvider.credential(fbToken);
  auth
    .signInAndRetrieveDataWithCredential(credential)
    .then((result) => {
      const { user } = result;
      const { uid } = user;
      return createUser(uid, processUserFromFacebookData(user), callback);
    })
    .catch((error) => callback(false, null, { message: error }));
}

//Sign user in using Facebook
export function signInWithFacebook(fbToken, callback) {
  const credential = authObj.FacebookAuthProvider.credential(fbToken);
  auth
    .signInAndRetrieveDataWithCredential(credential)
    .then((result) => {
      const { user } = result;
      const { uid } = user;
      return database
        .ref('/users/' + uid)
        .once('value')
        .then((snapshot) => {
          var exists = snapshot.val() !== null;
          console.log('check fb user exists', exists);
          if (exists) {
            return callback(true, processUserFromFacebookData(user), null);
          } else {
            return createUser(uid, processUserFromFacebookData(user), callback);
          }
        })
        .catch((error) => callback(false, null, { message: error }));
    })
    .catch((error) => callback(false, null, { message: error }));
}

function processUserFromFacebookData(user) {
  const { uid, displayName, email, photoURL } = user;
  return {
    isFacebookUser: true,
    email,
    displayname: displayName,
    uid,
    userimage: `${photoURL}?height=${imageSize}`,
  };
}

export function checkFbUserExist(user, callback) {
  const { uid } = user;
  database
    .ref('/users/' + uid)
    .once('value')
    .then((snapshot) => {
      var exists = snapshot.val() !== null;
      console.log('check fb user exists', exists);
      if (exists) {
        return callback(true, processUserFromFacebookData(user), null);
      } else {
        return createUser(uid, processUserFromFacebookData(user), callback);
      }
    })
    .catch((error) => callback(false, null, { message: error }));
}
