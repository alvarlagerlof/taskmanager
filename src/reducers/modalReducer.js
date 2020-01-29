import { SHOW_MODAL, HIDE_MODAL } from '../actions/types/modal'

const intialState = {
  type: null,
  open: false,
  props: {}
}

export default function(state = intialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        open: true,
        type: action.payload.type,
        props: action.payload.props
      }

    case HIDE_MODAL:
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}
