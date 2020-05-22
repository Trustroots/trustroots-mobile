import React from 'react'
import { Router, Stack, Scene, Drawer as RouterDrawer } from 'react-native-router-flux'

import Drawer from '../components/Drawer'
import DrawerIcon from '../components/DrawerIcon'

import Welcome from './Welcome'
import Login from './Login'
import Empty from './Empty'

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

        <RouterDrawer
          hideNavBar
          key="drawer"
          contentComponent={Drawer}
          drawerIcon={() => <DrawerIcon />}
          drawerWidth={240}
        >
          <Scene key="test" component={Empty} title="test" />
        </RouterDrawer>
      </Stack>
    </Router>
  )
}

export default App
