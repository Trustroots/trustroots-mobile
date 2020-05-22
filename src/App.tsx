import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Router from './scenes/Router'
import { store, persistor } from './common/store'

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  }
}