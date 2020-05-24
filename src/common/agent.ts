import { Platform } from 'react-native'
import CookieManager from 'react-native-cookies'

import config from './config'

import { Results } from '../declarations.d'
// TODO: This is suboptimal and leads to a recursive import
// solution: refactor agent to generator to be called from sagas
// import { store } from './store'
// import { REQUEST_ERROR } from './constants'

let cookies: any = {}

export const getSession = () => cookies['connect.sid']

export const setSession = async (session: string) =>
  await (Platform.OS === 'android' ?
  CookieManager.setFromResponse(
    config.host,
    `connect.sid=${session}; path=/; Thu, 1 Jan 2030 00:00:00 -0000; secure`
  ) :
  CookieManager.set({
    name: 'connect.sid',
    value: session,
    path: '/',
    version: '1',
    domain: 'www.trustroots.org',
    origin: 'www.trustroots.org',
    expiration: '2030-01-01T00:00:00.00-00:00'
  })
)

export default (
  endpoint: 'login' | 'logout' | 'messagesCount' | 'messages' | 'conversation' | 'markRead' | 'offers',
  data?: any,
  options?: any
): Promise<any> => {
  const { method, uri } = config.endpoints[endpoint]
      , opts = options || {}
      , url = config.host +
              Object.keys(opts)
                    .reduce((u, key) => u.replace('{' + key +'}', encodeURIComponent(opts[key])), uri)

  return fetch(url, {
    headers: {
      'User-Agent': config.userAgent,
      Accept: 'application/json',
      ...(data ? {'Content-Type': 'application/json'} : {})
    },
    method,
    credentials: 'same-origin',
    ...(data ? {body: JSON.stringify(data)} : {})
  }).then(async response => {
    if (response.headers.has('set-cookie'))
      cookies = await CookieManager.get(config.host)

    if (response.status === 200)
      return response.json()
    console.log(response)
    switch (response.status) {
      case 400: throw Results.MALFORMED
      case 401: throw Results.FORBIDDEN
      case 403: throw Results.UNAUTHORIZED
      case 404: throw Results.NOT_FOUND
      case 500: throw Results.SERVER_ERROR

      default: throw Results.SERVER_ERROR
    }
  }).catch(e => {
    const error = typeof e === 'object' ? Results.CONNECTION_ERROR : e
    // console.log('agent error', url, data, opts, error)

    // store.dispatch({type: REQUEST_ERROR, payload: error})

    throw error
  })
}