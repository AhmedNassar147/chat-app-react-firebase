import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB8Y7rPCVxKDoN1ZWJgnLXiGvZn0MCFmtg',
  authDomain: 'webchat-6e302.firebaseapp.com',
  databaseURL: 'https://webchat-6e302.firebaseio.com',
  projectId: 'webchat-6e302',
  storageBucket: 'webchat-6e302.appspot.com',
  messagingSenderId: '265453368345',
};
export default firebase.initializeApp(config);