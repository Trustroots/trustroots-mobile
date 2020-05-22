import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

export default combineReducers({
  ...createForms({
    login: {}
  })
})
