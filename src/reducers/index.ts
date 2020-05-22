import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import app from './app'
import profile from './profile'

export default combineReducers({
  app,
  profile,
  ...createForms({
    login: {},
    drafts: {},
  })
})