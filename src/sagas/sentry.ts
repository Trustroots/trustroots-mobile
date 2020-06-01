import { take } from 'redux-saga/effects'
import * as Sentry from '@sentry/react-native'
import {
  LOGIN_REQUEST,
  KEYCHAIN,
  MESSAGES_SUCCESS,
  PROFILE,
} from '../common/constants'

const filter = {}

filter[LOGIN_REQUEST] = ['password']
filter[KEYCHAIN] = ['password']
filter[PROFILE] = ['additionalProvidersData']
filter[MESSAGES_SUCCESS] = ['*.content']

const recursiveReplacer = (path: string[], obj: any) => {
  if (path[0] === '*')
    obj.forEach(child => recursiveReplacer(path.slice(1), child))
  else if (path.length === 1 && obj && typeof obj[path[0]] === 'string')
    obj[path[0]] = obj[path[0]].replace(/./g, '*')
  else if (obj && obj[path[0]])
    recursiveReplacer(path.slice(1), obj[path[0]])
}

export default function* () {
  while (true) {
    // Wait until we get ANY event
    const { type, payload } = yield take()

    // Skip form and init actions
    if (type.startsWith('rrf') || type.startsWith('@') || type.startsWith('persist'))
      continue

    // Apply our recursive censorship magic ;)
    if (filter[type])
      filter[type].forEach(path =>
        recursiveReplacer(path.split(/\./), payload)
      )

    // Add the redux action to the redux breadcrumb
    Sentry.addBreadcrumb({
      category: 'redux',
      message: type,
      level: type.match(/ERROR/) ? Sentry.Severity.Warning : Sentry.Severity.Info,
      ...(payload ?
        {data: typeof payload === 'object' ? payload : {payload}} :
        {}
      )
    })
  }
}