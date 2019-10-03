// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBfeeW-_EgiKRMTvRgx78lUOIJWD_7ukA0',
  authDomain: 'react-hooks-464ca.firebaseapp.com',
  databaseURL: 'https://react-hooks-464ca.firebaseio.com',
  projectId: 'react-hooks-464ca',
  storageBucket: 'react-hooks-464ca.appspot.com',
  messagingSenderId: '184028466290',
  appId: '1:184028466290:web:d277da8a2c1f6b606986eb',
  measurementId: 'G-9V11692PTK',
};

firebase.initializeApp(firebaseConfig);

export const fetchMessages = async () => {
  const messagesRef = await firebase.database().ref(`messages`);
  const messagesSnap = await messagesRef
    .orderByChild('createdAt')
    .once(`value`);
  return { ref: messagesRef, value: messagesSnap.toJSON() };
};

export const addMessage = async newMessage => {
  // Get a key for a new Post.
  var newMessageKey = firebase
    .database()
    .ref()
    .child('messages')
    .push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {
    [`/messages/${newMessageKey}`]: {
      ...newMessage,
      id: newMessageKey,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    },
  };

  return firebase
    .database()
    .ref()
    .update(updates);
};
