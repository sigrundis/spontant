// In this file, we will be creating several functions that interacts with the Firebase API to carry out our CRUD operations.
import { database } from '../../config/firebase';

export function addInvite(invite, callback) {
  const { userId } = invite;
  const newInviteRef = database
    .ref()
    .child('invites')
    .push();
  const newInviteKey = newInviteRef.key;

  invite.id = newInviteKey;

  // Write the new invite data simultaneously in the invites list and the user's invites list.
  let updates = {};
  updates['/invites/' + newInviteKey] = invite;
  updates['/user-invites/' + userId + '/' + newInviteKey] = invite;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, invite, null))
    .catch((error) => callback(false, null, error));
}

export function getInvites(callback) {
  const invitesRef = database.ref('invites');

  //start listening for new data
  invitesRef.on('value', function(snapshot) {
    callback(true, snapshot, null);
  });
}

export function updateInvite(invite, callback) {
  const { id, userId } = invite;

  let updates = {};
  updates['invites/' + id] = invite;
  updates['/user-invites/' + userId + '/' + id] = invite;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, invite, null))
    .catch((error) => callback(false, null, error));
}

export function deleteInvite(invite, callback) {
  const { id, userId } = invite;

  let updates = {};
  updates['invites/' + id] = null;
  updates['/user-invites/' + userId + '/' + id] = null;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, invite, null))
    .catch((error) => callback(false, null, error));
}

export function addJoin(data, callback) {
  const { invite, uid } = data;
  const inviteRef = database.ref('invites/' + invite.id);

  inviteRef.transaction(
    function(invite) {
      if (invite) {
        if (invite.attendees && invite.attendees[uid]) {
          invite.joinCount--;
          invite.attendees[uid] = null;
        } else {
          invite.joinCount++;
          if (!invite.attendees) invite.attendees = {};
          invite.attendees[uid] = true;
        }
      }
      return invite;
    },
    function(error, committed, snapshot) {
      if (error || !committed) callback(false, null, error);
      else callback(true, snapshot.val(), null);
    }
  );
}

export function updateUser(user, callback) {
  const { uid } = user;

  let updates = {};
  updates['users/' + uid] = user;

  database
    .ref()
    .update(updates)
    .then(() => callback(true, user, null))
    .catch((error) => callback(false, null, error));
}
