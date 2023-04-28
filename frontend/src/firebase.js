import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyBTGjbsdkdNkHE5kVidYkFym4rssYOltOo",
  authDomain: "foodstore-mern.firebaseapp.com",
  projectId: "foodstore-mern",
  storageBucket: "foodstore-mern.appspot.com",
  messagingSenderId: "756903799076",
  appId: "1:756903799076:web:d8e2034712594fb12debb1"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
