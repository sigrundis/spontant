import {
  auth,
  database,
  provider,
  emailAuthProvider,
} from '../../config/firebase';

//Register the user using email and password
export function register(data, callback) {
  const { email, password, username, displayname } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((resp) =>
      createUser({ username, displayname, uid: resp.user.uid, email }, callback)
    )
    .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser(user, callback) {
  const userRef = database.ref().child('users');

  userRef
    .child(user.uid)
    .update({ ...user })
    .then(() => callback(true, user, null))
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

//Sign user in using Facebook
export function signInWithFacebook(fbToken, callback) {
  const credential = provider.credential(fbToken);
  auth
    .signInWithCredential(credential)
    .then((user) => getUser(user, callback))
    .catch((error) => callback(false, null, error));
}
