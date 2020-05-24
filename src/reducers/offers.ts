import {
  OFFERS_SUCCESS
} from '../common/constants'

const initialState = []

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case OFFERS_SUCCESS:
      return payload.concat()

    default:
      return state
  }
}
