import { all } from 'redux-saga/effects'

import session from './session'
import messages from './messages'

export default function* rootSaga () {
  yield all([
    session(),
    messages()
  ])
}