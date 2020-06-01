import { all } from 'redux-saga/effects'

import session from './session'
import messages from './messages'
import offers from './offers'
import profiles from './profiles'
import sentry from './sentry'

export default function* rootSaga () {
  yield all([
    session(),
    messages(),
    offers(),
    profiles(),
    sentry()
  ])
}