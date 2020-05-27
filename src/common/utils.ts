import { UserReference, ApiWatcher, User } from '../declarations'
import { take, put } from 'redux-saga/effects'
import moment from 'moment'

export const apiWatcher =
  (awaitAction: string, successAction: string, generator?: (payload?) => Promise<any>) =>
    function* (): ApiWatcher {
      while (true) {
        // Wait until we get our expected event
        const { payload } = yield take(awaitAction)
        try {
          // Yield the sub-generator and dispatch the successful result
          yield put({type: successAction, payload: yield generator(payload)})
        } catch(e) {/* Request errors are handled via Redux reducers */}
      }
    }

export const calculateAge = (date: string) =>
  moment().diff(moment(date), 'years')

export const userImageURL = (user: UserReference | User, size: number = 64): string =>
  user.avatarSource === 'local' ? `https://www.trustroots.org/uploads-profile/${user._id}/avatar/${size}.jpg` :
  user.avatarSource === 'facebook' ? `https://graph.facebook.com/${user.additionalProvidersData.facebook.id}/picture/?width=${size}&height=${size}` :
  user.avatarSource === 'gravatar' ? `https://gravatar.com/avatar/${user.emailHash}?s=${size}` :
  null
