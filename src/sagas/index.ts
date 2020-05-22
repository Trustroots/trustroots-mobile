import { all } from 'redux-saga/effects'

import Session from './session'

export default function* rootSaga () {
  yield all([
    Session(),
  ])
}