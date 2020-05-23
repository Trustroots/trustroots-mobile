import {
  MESSAGES_SUCCESS
} from '../common/constants'

const initialState = []

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case MESSAGES_SUCCESS:
      return payload.concat()

    default:
      return state
  }
}
