import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  REQUEST_ERROR
} from '../common/constants'

const initialState = {
  session: null,
  authenticating: null
}

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case REQUEST_ERROR:
      return state.authenticating ? {
        ...state,
        authenticating: false
      } : state

    case LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      }

    case LOGIN_ERROR:
      return {
        ...state,
        authenticating: false
      }

    case LOGIN_SUCCESS:
      const session = payload
      return {
        ...state,
        session,
        authenticating: null
      }

    case LOGOUT:
      return {
        ...state,
        session: null,
        authenticating: null
      }

    default:
      return state
  }
}
