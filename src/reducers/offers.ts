import {
  OFFERS_SUCCESS, OFFER_SUCCESS
} from '../common/constants'

const initialState = {
  pois: [],
  offers: {}
}

export default function reducer(state = initialState, action: any = {}) {
  const { type, payload } = action
  switch (type) {
    case OFFER_SUCCESS:
      const offer = {}
      offer[payload._id] = payload

      return {
        ...state,
        offers: {
          ...state.offers,
          ...offer
        }
      }

    case OFFERS_SUCCESS:
      return {
        ...state,
        pois: payload.concat(),
      }

    default:
      return state
  }
}
