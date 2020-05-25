import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Router from './scenes/Router'
import { store, persistor } from './common/store'

// TODO: these should be kept to an *absolute* minimum and regularly reevaluated
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
  'Animated: `useNativeDriver`',
  'Require cycle: node_modules/react-redux-form',
  'Require cycle: node_modules/react-native-maps'
])

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  }
}