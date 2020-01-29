import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  GET_LISTS_STARTED,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,
  SET_CURRENT_LIST
} from '../actions/types/list'

const intialState = {
  items: [],
  currentList: null,
  loading: true,
  error: false,
  errorText: null
}

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_LISTS_STARTED:
      return {
        ...state,
        error: false,
        loading: true
      }

    case GET_LISTS_FAILURE:
      return {
        ...state,
        error: true,
        errorText: action.payload.error
      }

    case GET_LISTS_SUCCESS:
      return {
        ...state,
        items: action.payload.lists,
        error: false
      }

    case CREATE_LIST:
      return {
        ...state,
        items: [action.payload.list, ...state.items]
      }

    case DELETE_LIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }

    case UPDATE_LIST:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.list.id ? { ...item, ...action.payload.list } : item
        )
      }

    case SET_CURRENT_LIST:
      return {
        ...state,
        currentList: action.payload.id,
        loading: false
      }

    default:
      return state
  }
}
