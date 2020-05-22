import { take, fork, call, put, select } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import * as Keychain from 'react-native-keychain'
import { actions as formActions } from 'react-redux-form'

import CookieManager from 'react-native-cookies'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  KEYCHAIN,
  PROFILE
} from '../common/constants'

import { login, logout } from '../common/api'
import { Linking } from 'react-native'

function* loginFlow(username: string, password: string) {
  try {
    // Make sure and clean all cookies known to us
    yield CookieManager.clearAll()

    // Here we go, login the user
    const user = yield call(login, username, password)
    console.log(user)
    // All good, let's proceed to main
    Actions.reset('welcome')

    // .. or to another scene if we got a deep link incoming
    const initial = yield getInitialScene()
    if (initial)
      Actions.jump(initial.scene, initial.props)

    // Save the validated username and password in the device's safe store
    yield Keychain.setGenericPassword(username, password)

    // If we came that far, un-hide the splash screen
    // yield SplashScreen.hide()

    // Signal our successful login!
    yield put({type: LOGIN_SUCCESS})

    // Request and broadcast the profile information of our fresh user
    yield put({type: PROFILE, payload: user})

  } catch (error) {
    // Signal that something went wrong..
    yield put({ type: LOGIN_ERROR, error })
  }
}

function* logoutFlow() {
  // Reset all forms
  yield put(formActions.reset('drafts'))
  yield put(formActions.change('login.password', ''))

  // Throw the user back to the login screen
  Actions.reset('login')

  // Delete the previously stored password from the secure location
  yield Keychain.resetGenericPassword()

  // Try to logout the user out from trustroots
  try {
    yield call(logout)
  } catch(e) {
    console.log('online logout failed', e)
  }

  // Hard reset all system cookies
  yield CookieManager.clearAll()
}

function* getInitialScene() {
  try {
    const url = yield Linking.getInitialURL()
  } catch(e) {}
  return null
}

export default function* loginSaga() {
  // Wait until our store got re-hydrated
  yield take('persist/REHYDRATE')

  // Water our store with previously stored session and credentials
  // yield fork(reauthenticateFlow)

  while (true) {
    // Wait until we get a login request
    const { type } = yield take([LOGIN_REQUEST, LOGIN_SUCCESS])

    // Skip authentication in case we got a re-hydrated LOGIN_SUCCESS
    if (type === LOGIN_REQUEST) {

      // Pull the login form from
      const { username, password } = yield select(state => state.login)

      // Start the login flow
      yield fork(loginFlow, username, password)
    }

    // Wait until we either logout or get logged out
    const { type: logoutReason } = yield take([LOGOUT, LOGIN_ERROR])

    // Start the logout flow if the user desires to do so
    if (logoutReason === LOGOUT)
      yield call(logoutFlow)
  }
}