import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import Welcome from './Welcome'
import Login from './Login'
import colors from '../common/colors'

const App = () => {
  return (
    <Router>
      <Stack
        key="root"
        tintColor={colors.foreground}
        navigationBarStyle={{backgroundColor: colors.background}}
        hideNavBar
      >
        <Scene key="welcome" component={Welcome} title="Welcome" initial />
        <Scene key="login" component={Login} title="Login" />
      </Stack>
    </Router>
  )
}

export default App
