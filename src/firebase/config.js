import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyBvkIpOEUQpy33yu6k6KVnocxhzojLsMmE',
  authDomain: 'the-wild-oasis-72431.firebaseapp.com',
  projectId: 'the-wild-oasis-72431',
  storageBucket: 'the-wild-oasis-72431.appspot.com',
  messagingSenderId: '420301672758',
  appId: '1:420301672758:web:1df6b3edaaa327626ee397',
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const cabinsCollection = db.collection('cabins');
export const auth = firebase.auth();
export const storage = firebase.storage()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
