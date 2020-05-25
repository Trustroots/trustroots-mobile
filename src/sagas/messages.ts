import { take, call, fork, put } from 'redux-saga/effects'

import { Platform } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import AndroidBadge from 'react-native-android-badge'

import {
  MESSAGES_COUNT_SUCCESS, MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_COUNT_REQUEST
} from '../common/constants'

import { messages, unreadCount } from '../common/api'

export default function* conversationsSaga() {
  // Handle messages requests
  yield fork(messageWatcher)

  // Wait for actions altering the conversations unread counter
  yield fork(unreadWatcher)
}

// Handle unread messages requests and responses
function* unreadWatcher() {
  while (true) {
    const { type, payload } = yield take([MESSAGES_COUNT_REQUEST, MESSAGES_COUNT_REQUEST])

    switch(type) {
      case MESSAGES_COUNT_REQUEST:
        yield put({type: MESSAGES_COUNT_SUCCESS, payload: yield unreadCount()})
        break

      case MESSAGES_COUNT_SUCCESS:
        // Set the badge count depending on the relevant bridge
        // TODO: this actually should work - but doesn't :D
        yield call(
          Platform.OS === 'ios' ?
            PushNotificationIOS.setApplicationIconBadgeNumber :
            AndroidBadge.setBadge,
          payload
        )
        break
    }
  }
}

// Wait for message listing requests and fulfill them
function* messageWatcher() {
  while (true) {
    yield take(MESSAGES_REQUEST)
    try {
      yield put({type: MESSAGES_SUCCESS, payload: yield messages()})
    } catch(e) { /* Request error handling is happening @agent */ }
  }
}