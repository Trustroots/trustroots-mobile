import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from '@sentry/react-native'
import Router from './scenes/Router'
import { store, persistor } from './common/store'


// if (!__DEV__)
  Sentry.init({
    dsn: 'https://0636d6c8a5d44207932803e14587b8e4@o217834.ingest.sentry.io/5260211'
  })

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