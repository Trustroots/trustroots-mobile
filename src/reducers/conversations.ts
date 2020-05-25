import {
  MESSAGES_SUCCESS, LOGOUT
} from '../common/constants'

const initialState = []

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case MESSAGES_SUCCESS:
      return payload.concat()

    case LOGOUT:
      return []

    default:
      return state
  }
}
