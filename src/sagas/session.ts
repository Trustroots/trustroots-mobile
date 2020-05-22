import { take, fork, call, put, select } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import * as Keychain from 'react-native-keychain'
import { actions as formActions } from 'react-redux-form'

import CookieManager from 'react-native-cookies'
import { Results } from '../declarations.d'

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
import { getSession, setSession } from '../common/agent'

function* loginFlow(username: string, password: string) {
  try {
    // Make sure and clean all cookies known to us
    yield CookieManager.clearAll()

    // Here we go, login the user
    const user = yield call(login, username, password)

    // All good, let's proceed to main
    Actions.replace('drawer')

    // .. or to another scene if we got a deep link incoming
    const initial = yield getInitialScene()
    if (initial)
      Actions.jump(initial.scene, initial.props)

    // Save the validated username and password in the device's safe store
    yield Keychain.setGenericPassword(username, password)

    // If we came that far, un-hide the splash screen
    // yield SplashScreen.hide()

    // Signal our successful login!
    yield put({type: LOGIN_SUCCESS, payload: getSession()})

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

  // Throw the user back to the welcome screen
  Actions.reset('welcome')

  // Delete the previously stored password from the secure location
  yield Keychain.resetGenericPassword()

  // Try to logout the user out from trustroots
  try {
    yield call(logout)
  } catch(e) {
    console.log('online logout failed, but do not worry - be happy', e)
  }

  // Hard reset all system cookies
  yield CookieManager.clearAll()
}

function* reauthenticateFlow() {
  const session = yield select(state => state.app.session)
  try {
    // No session, no fun.
    if (!session)
      throw 'no stored session'

    // Let's always assume we got a working session - predictive ux for the win!
    const initial = yield getInitialScene()
    setTimeout(() => {
      Actions.reset('drawer')
      if (initial)
        Actions.jump(initial.scene, initial.props)

      // SplashScreen.hide()
    }, 100)

    // Configure our API adapter to use the stored session & token
    setSession(session)

    // Check if we still have a valid session at hand
    // const { id } = yield getCurrentUser()

    // Yep, let's restore our cookies
    // yield syncCookies()

    // Notify all listeners that we got a valid session running
    yield put({type: LOGIN_SUCCESS, payload: session})

    // Refresh and broadcast the profile information of our
    // yield put({type: PROFILE, payload: yield call(getCurrentProfile)})

  } catch(error) {
    // In case the login failed because the user is offline..
    if (error === Results.CONNECTION_ERROR) {
      // .. continue from cache and assume we got a valid session
      yield put({type: LOGIN_SUCCESS, payload: session})
    } else {
      // .. or report why we failed
      console.log('reauthentication failed', error)

      // Try to pull previously stored credentials from secure store
      const result = yield Keychain.getGenericPassword()

      // If we don't find what we need, directly proceed to our welcome screen
      if (!result || !result.username || !result.password)
        return Actions.reset('welcome')

      // Blast them through the pipe to get 'em into the store
      const { username, password } = result
      yield put({type: KEYCHAIN, payload: {username, password}})

      // Populate our login state/form
      yield put(formActions.change('login.username', username))
      yield put(formActions.change('login.password', password))

      // ... to finally trigger the login procedure
      yield put({type: LOGIN_REQUEST})
    }
  }

  // Wait for our reauthentication either fail or succeed
  const { type } = yield take([LOGIN_SUCCESS, LOGIN_ERROR])
  if (type === LOGIN_ERROR) {
    // yield SplashScreen.hide()
    yield Actions.reset('welcome')
  }
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
  yield fork(reauthenticateFlow)

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