import {
  CREATE_TODO,
  UPDATE_TODO,
  SORT_TODOS,
  DELETE_TODO,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  GET_TODOS_STARTED
} from '../actions/types/todo'

const intialState = {
  items: [],
  loading: true,
  error: false,
  errorText: null
}

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_TODOS_STARTED:
      return {
        ...state,
        error: false,
        loading: true
      }

    case GET_TODOS_FAILURE:
      return {
        ...state,
        error: true,
        errorText: action.payload.error,
        loading: false
      }

    case GET_TODOS_SUCCESS:
      return {
        ...state,
        items: action.payload.todos,
        loading: false,
        error: false
      }

    case SORT_TODOS:
      return {
        ...state,
        items: [
          ...state.items.filter(item => !item.done).sort((a, b) => b.timestamp - a.timestamp),
          ...state.items.filter(item => item.done).sort((a, b) => b.timestamp - a.timestamp)
        ]
      }

    case CREATE_TODO:
      return {
        ...state,
        items: [action.payload.todo, ...state.items]
      }

    case DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }

    case UPDATE_TODO:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.todo.id ? { ...item, ...action.payload.todo } : item
        )
      }

    default:
      return state
  }
}
