import { apiWatcher } from '../common/utils'
import { profile } from '../common/api'
import { fork } from 'redux-saga/effects'

import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS
} from '../common/constants'

export default function* () {
  // Watch and handle offer requests (triggered from the map)
  yield fork(apiWatcher(PROFILE_REQUEST, PROFILE_SUCCESS, profile))
}