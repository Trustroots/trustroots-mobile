import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import app from './app'
import profile from './profile'
import conversations from './conversations'
import offers from './offers'

export default combineReducers({
  app,
  profile,
  conversations,
  offers,
  ...createForms({
    login: {},
    drafts: {},
  })
})