import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import app from './app'

export default combineReducers({
  app,
  ...createForms({
    login: {},
    drafts: {},
  })
})