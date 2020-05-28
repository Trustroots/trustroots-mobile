import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import app from './app'
import profile from './profile'
import conversations from './conversations'
import offers from './offers'
import profiles from './profiles'

export default combineReducers({
  app,
  profile,
  conversations,
  offers,
  profiles,
  ...createForms({
    login: {},
    drafts: {},
  })
})