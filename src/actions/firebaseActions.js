import {
  ADD_FIREBASE,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from './types/firebase'
import Firebase from '../Firebase/firebase'

export const addFirebase = () => ({
  type: ADD_FIREBASE,
  payload: {
    fb: new Firebase().fb
  }
})

export const login = () => (dispatch, getState) => {
  const firebase = getState().firebase.fb
  firebase.auth().useDeviceLanguage()

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE, payload: { error } })
    })
}

export const loginRedirectHandler = () => (dispatch, getState) => {
  const loginStarted = () => ({ type: LOGIN_STARTED })
  const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: { user } })
  const loginFailure = error => ({ type: LOGIN_FAILURE, payload: { error } })

  dispatch(loginStarted())

  const auth = getState().firebase.fb.auth()
  const firestore = getState().firebase.fb.firestore()

  auth.onAuthStateChanged(user => {
    if (user) {
      firestore
        .collection('users')
        .doc(user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          currentList: null
        })

      dispatch(loginSuccess(user))
    } else {
      auth
        .getRedirectResult()
        .then(result => {
          if (result.user) {
            firestore
              .collection('users')
              .doc(result.user.uid)
              .update({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
              })

            dispatch(loginSuccess(result.user))
          } else {
            dispatch(loginFailure('no user'))
          }
        })
        .catch(error => {
          dispatch(loginFailure(error.message))
        })
    }
  })
}

export const logout = () => (dispatch, getState) => {
  getState()
    .firebase.fb.auth()
    .signOut()
  dispatch({ type: LOG_OUT })
}
