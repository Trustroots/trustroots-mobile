import config from './config'

// TODO: This is suboptimal and leads to a recursive import
// solution: refactor agent to generator to be called from sagas
// import { store } from './store'
// import { REQUEST_ERROR } from './constants'

export default (
  endpoint: 'login' | 'logout',
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
    // if (response.headers.has('set-cookie'))
    //   syncCookies()

    if (response.status === 200)
      return response.json()

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