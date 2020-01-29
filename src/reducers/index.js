import { combineReducers } from 'redux'
import todoReducer from './todoReducer'
import listReducer from './listReducer'
import modalReducer from './modalReducer'
import firebaseReducer from './firebaseReducer'

export default combineReducers({
  todos: todoReducer,
  lists: listReducer,
  modal: modalReducer,
  firebase: firebaseReducer
})
