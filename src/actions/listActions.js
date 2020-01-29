import {
  CREATE_LIST,
  DELETE_LIST,
  UPDATE_LIST,
  GET_LISTS_STARTED,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,
  SET_CURRENT_LIST
} from './types/list'

export const getLists = () => (dispatch, getState) => {
  dispatch(getListsStarted())

  if (getState().firebase.fb == null) {
    dispatch(getListsFailure('firebase not loaded'))
  } else {
    getState()
      .firebase.fb.firestore()
      .collection('users')
      .doc(getState().firebase.user.uid)
      .collection('lists')
      .get()
      .then(snap => {
        const lists = []

        snap.forEach(doc => {
          lists.push({
            id: doc.id,
            name: doc.data().name
          })
        })

        dispatch(getListsSuccess(lists))
      })
      .catch(error => {
        dispatch(getListsFailure(error))
      })
  }
}

export const getListsStarted = () => ({ type: GET_LISTS_STARTED })
export const getListsSuccess = lists => ({ type: GET_LISTS_SUCCESS, payload: { lists } })
export const getListsFailure = error => ({ type: GET_LISTS_FAILURE, payload: { error } })

export const createList = list => (dispatch, getState) => {
  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('lists')
    .doc(list.id)
    .set({
      name: list.name
    })

  dispatch({
    type: CREATE_LIST,
    payload: {
      list
    }
  })

  dispatch(setCurrentList(list.id))
}

export const updateList = list => (dispatch, getState) => {
  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('lists')
    .doc(list.id)
    .update({
      name: list.name
    })

  dispatch({
    type: UPDATE_LIST,
    payload: {
      list
    }
  })
}

export const deleteList = id => (dispatch, getState) => {
  const listsAfterDelete = getState().lists.items.filter(item => item.id !== id)

  if (listsAfterDelete.length > 0) {
    dispatch({
      type: SET_CURRENT_LIST,
      payload: {
        id: listsAfterDelete[0].id
      }
    })
  } else {
    dispatch({
      type: SET_CURRENT_LIST,
      payload: {
        id: null
      }
    })
  }

  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('lists')
    .doc(id)
    .delete()

  getState()
    .firebase.fb.firestore()
    .collection('users')
    .doc(getState().firebase.user.uid)
    .collection('todos')
    .where('list', '==', id)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        doc.ref.delete()
      })
    })

  dispatch({
    type: DELETE_LIST,
    payload: {
      id
    }
  })
}

export const getCurrentList = () => (dispatch, getState) => {
  const firestore = getState().firebase.fb.firestore()
  const user = getState().firebase.user

  firestore
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      if (doc.data().currentList) {
        dispatch(setCurrentList(doc.data().currentList))
      } else if (getState().lists.items.length) {
        const randomList = getState().lists.items[0].id
        dispatch(setCurrentList(randomList))
      } else {
        dispatch(setCurrentList(null))
      }
    })
}

export const setCurrentList = id => (dispatch, getState) => {
  const firestore = getState().firebase.fb.firestore()
  const user = getState().firebase.user

  firestore
    .collection('users')
    .doc(user.uid)
    .update({
      currentList: id
    })

  dispatch({
    type: SET_CURRENT_LIST,
    payload: {
      id
    }
  })
}
