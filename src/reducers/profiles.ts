import {
  PROFILE_SUCCESS,
  LOGOUT
} from '../common/constants'

const initialState = {}

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case PROFILE_SUCCESS:
      const data = {}
      data[payload.username] = payload
      return {
        ...state,
        ...data
      }

    case LOGOUT:
      return {...initialState}

    default:
      return state
  }
}
