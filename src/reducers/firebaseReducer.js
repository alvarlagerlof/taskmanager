import {
  ADD_FIREBASE,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from '../actions/types/firebase'

const intialState = {
  loading: false,
  loggedIn: false,
  loginError: null,
  user: {
    uid: null,
    name: null,
    email: null,
    photoURL: null,
    latestList: null
  },
  fb: null
}

export default function(state = intialState, action) {
  switch (action.type) {
    case ADD_FIREBASE:
      return {
        ...state,
        fb: action.payload.fb
      }

    case LOGIN_STARTED:
      return {
        ...state,
        loading: true
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        loginError: null,
        user: action.payload.user
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload.error,
        loggedIn: false,
        loading: false
      }

    case LOG_OUT:
      return {
        ...state,
        user: intialState.user,
        loading: false,
        loggedIn: false,
        loginError: null
      }

    default:
      return state
  }
}
