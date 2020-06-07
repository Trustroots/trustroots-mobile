import React from 'react'
import { Router, Stack, Scene, Drawer as RouterDrawer, Tabs } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withBadge } from 'react-native-elements'

import Drawer from '../components/Drawer'
import DrawerIcon from '../components/DrawerIcon'

import Loading from './Loading'
import Welcome from './Welcome'
import Login from './Login'
import Map from './Map'
import Messages from './Messages'
import Profile from './Profile'
import ProfileTitle from '../components/ProfileTitle'

import colors from '../common/colors'
import MessagesTabIcon from '../components/MessagesTabIcon'

const icon = (name: string, size: number = 32, color?: string, badge?: number) => ({focused}) => {
  const Component = badge ? withBadge(badge)(Icon) : Icon
  return (
    <Component
      testID={`navigation.${name}`}
      name={focused ? name : name + '-outline'}
      size={size || 32}
      style={{marginTop: 3, color:
        color ? color :
        focused ? colors.navigationTabActive :
        colors.navigationTabInactive
      }}
    />
  )
}

const App = () => {
  return (
    <Router>
      <Stack
        key="root"
        tintColor={colors.foreground}
        navigationBarStyle={{backgroundColor: colors.background}}
        hideNavBar
      >
        <Scene key="loading" component={Loading} initial />
        <Scene key="welcome" component={Welcome} />
        <Scene key="login" component={Login} />

        <Scene
          key="profile"
          component={Profile}
          hideNavBar={false}
          backTitle=" "
          renderTitle={({username}) => <ProfileTitle username={username} />}
        />

        <RouterDrawer
          hideNavBar
          key="drawer"
          contentComponent={Drawer}
          drawerIcon={() => <DrawerIcon />}
          drawerWidth={240}
        >
          <Tabs
            key="main"
            showLabel={false}
            activeTintColor="#D7CCC8"
            inactiveTintColor="#9E837A"
          >
            <Scene
              key="map"
              title="Search"
              component={Map}
              icon={icon('map-search')}
            />
            <Scene
              icon={MessagesTabIcon}
              key="messages"
              title="Messages"
              component={Messages}
            />
            <Scene
              key="you"
              title="Your profile"
              component={Profile}
              icon={icon('account-circle')}
            />
          </Tabs>
        </RouterDrawer>
      </Stack>
    </Router>
  )
}

export default App
