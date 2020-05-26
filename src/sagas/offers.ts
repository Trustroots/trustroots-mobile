import { apiWatcher } from '../common/utils'
import { offers, offer } from '../common/api'
import { fork } from 'redux-saga/effects'

import {
  OFFERS_REQUEST,
  OFFERS_SUCCESS,
  OFFER_REQUEST,
  OFFER_SUCCESS
} from '../common/constants'

export default function* offersSaga() {
  // Watch and handle offer requests (triggered from the map)
  yield fork(apiWatcher(OFFER_REQUEST, OFFER_SUCCESS, offer))

  // Watch and handle offer searches
  yield fork(apiWatcher(OFFERS_REQUEST, OFFERS_SUCCESS, () =>
    offers(
      63.079544234557304,
      40.36425781250001,
      20.471954507739227,
      -13.4697265625
    )
  ))
}
