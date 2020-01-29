import { createStore, applyMiddleware, compose } from 'redux'
import { createMiddleware } from 'redux-listeners'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers'

import { addFirebase, loginRedirectHandler } from '../actions/firebaseActions'
import { getTodos } from '../actions/todoActions'
import { getLists, getCurrentList } from '../actions/listActions'

const initalState = {}
const listenMiddleware = createMiddleware()
const middleware = [thunk, logger, listenMiddleware]

const store = createStore(
  rootReducer,
  initalState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

listenMiddleware.addListener('INIT', dispatch => {
  dispatch(addFirebase())
  dispatch(loginRedirectHandler())
})

listenMiddleware.addListener('LOGIN_SUCCESS', dispatch => {
  dispatch(getLists())
  dispatch(getTodos())
})

listenMiddleware.addListener('GET_LISTS_SUCCESS', dispatch => {
  dispatch(getCurrentList())
})

store.dispatch({ type: 'INIT' })

export default store
