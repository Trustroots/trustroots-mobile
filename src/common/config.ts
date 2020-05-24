const PRODUCTION = true

export default {
  host: PRODUCTION ? 'https://www.trustroots.org' : `https://www.trustroots.org`,

  credentials: PRODUCTION ? {} : {email: 'userbot@example.com', password: 'user'},

  userAgent: 'Mozilla/5.0 (compatible; TrustrootsReactNative/1.0; +https://github.com/rastapasta/trustroots)',

  endpoints: {
    login: {uri: '/api/auth/signin', method: 'POST'},
    logout: {uri: '/api/auth/signout', method: 'GET'},
    messagesCount: {uri: '/api/messages-count', method: 'GET'},
    markRead: {uri: '/api/messages-read', method: 'POST'},
    messages: {uri: '/api/messages', method: 'GET'},
    conversation: {uri: '/api/messages/{conversationId}', method: 'GET'},
    offers: {uri: '/api/offers?filters={filters}&northEastLat={northEastLat}&northEastLng={northEastLng}&southWestLat={southWestLat}&southWestLng={southWestLng}', method: 'GET'}
  }
}