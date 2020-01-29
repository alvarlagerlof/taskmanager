import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.fb = firebase
  }
}

export default Firebase
