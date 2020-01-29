import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SORT_TODOS,
  GET_TODOS_STARTED,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE
} from './types/todo'

export const getTodos = () => (dispatch, getState) => {
  dispatch(getTodosStarted())

  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('todos')
    .get()
    .then(snap => {
      let todos = []

      snap.forEach(doc => {
        todos.push({
          id: doc.id,
          list: doc.data().list,
          timestamp: doc.data().timestamp,
          title: doc.data().title,
          text: doc.data().text,
          done: doc.data().done
        })
      })
      todos.sort((a, b) => b.timestamp - a.timestamp)

      dispatch(getTodosSuccess(todos))
    })
    .catch(error => {
      dispatch(getTodosFailure(error))
    })
}

export const getTodosStarted = () => ({
  type: GET_TODOS_STARTED
})

export const getTodosSuccess = todos => ({
  type: GET_TODOS_SUCCESS,
  payload: {
    todos
  }
})

export const getTodosFailure = error => ({
  type: GET_TODOS_FAILURE,
  payload: {
    error
  }
})

export const sortTodos = () => ({
  type: SORT_TODOS
})

export const createTodo = todo => (dispatch, getState) => {
  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('todos')
    .doc(todo.id)
    .set({
      list: todo.list,
      timestamp: todo.timestamp,
      title: todo.title,
      text: todo.text,
      done: todo.done
    })

  dispatch({
    type: CREATE_TODO,
    payload: {
      todo
    }
  })
  dispatch(sortTodos())
}

export const updateTodo = todo => (dispatch, getState) => {
  console.log('TODOO', todo)

  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('todos')
    .doc(todo.id)
    .update({
      title: todo.title,
      text: todo.text,
      done: todo.done
    })

  dispatch({
    type: UPDATE_TODO,
    payload: {
      todo: todo
    }
  })
  dispatch(sortTodos())
}

export const deleteTodo = id => (dispatch, getState) => {
  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('todos')
    .doc(id)
    .delete()

  dispatch({
    type: DELETE_TODO,
    payload: {
      id: id
    }
  })
}
