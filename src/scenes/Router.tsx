import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import Welcome from './Welcome'

const App = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Scene key="welcome" component={Welcome} title="Welcome" />
      </Stack>
    </Router>
  )
}

export default App
