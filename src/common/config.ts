const PRODUCTION = true

export default {
  host: PRODUCTION ? 'https://www.trustroots.org' : `https://www.trustroots.org`,

  credentials: PRODUCTION ? {} : {email: 'userbot@example.com', password: 'user'},

  userAgent: 'Mozilla/5.0 (compatible; TrustrootsReactNative/1.0; +https://github.com/rastapasta/trustroots)',

  endpoints: {
    login: {uri: '/api/auth/signin', method: 'POST'},
    logout: {uri: '/api/auth/signout', method: 'GET'}
  }
}