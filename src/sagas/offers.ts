import { take, put, fork } from 'redux-saga/effects'

import { offers } from '../common/api'

import {
  OFFERS_REQUEST,
  OFFERS_SUCCESS
} from '../common/constants'

function* fetch() {
  // Pull the markers from the API and publish them on the bus
  try {
    yield put({type: OFFERS_SUCCESS, payload: yield offers(
      63.079544234557304,
      40.36425781250001,
      20.471954507739227,
      -13.4697265625
    )})
  } catch(e) {/* Errors are handled via Redux reducers */}
}

export default function* offersSaga() {
  while (true) {
    // Wait until we get a offers request
    yield take([OFFERS_REQUEST])
    yield fork(fetch)
  }
}