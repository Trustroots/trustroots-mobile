import { apiWatcher } from '../common/utils'
import { offers, offer } from '../common/api'
import { fork } from 'redux-saga/effects'

import {
  OFFERS_REQUEST,
  OFFERS_SUCCESS,
  OFFER_REQUEST,
  OFFER_SUCCESS
} from '../common/constants'

export default function* () {
  // Watch and handle offer requests (triggered from the map)
  yield fork(apiWatcher(OFFER_REQUEST, OFFER_SUCCESS, offer))

  // Watch and handle offer searches
  yield fork(apiWatcher(OFFERS_REQUEST, OFFERS_SUCCESS, () =>
    offers(-90, 180, 90, -180, {seen: {months: 6}})
  ))
}
