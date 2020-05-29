import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TabView, TabBar, SceneMap, NavigationState, SceneRendererProps } from 'react-native-tab-view'
import Empty from './Empty'
import colors from '../common/colors'

import ProfileOverview from './ProfileOverview'
import { useDispatch } from 'react-redux'
import { PROFILE_REQUEST } from '../common/constants'

type Props = {
  username?: string
}

type TabState = NavigationState<{
  key: string,
  title: string
}>

const routes = [
  { key: 'overview', title: 'Overview' },
  { key: 'about', title: 'About' },
  { key: 'tribes', title: 'Tribes' },
  { key: 'hosting', title: 'Hosting' },
  { key: 'contacts', title: 'Contacts' },
]

const renderTabBar = (props: SceneRendererProps & { navigationState: TabState}) =>
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
  />

export default ({username}: Props) => {
  const [index, setIndex] = useState(0)
      , dispatch = useDispatch()

  useEffect(() => {
    if (username)
      dispatch({type: PROFILE_REQUEST, payload: username})
  }, [username])

  return (
    <TabView
      navigationState={{routes, index}}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      renderScene={({route}) => {
        switch(route.key) {
          case 'overview': return <ProfileOverview username={username} />
          default: return <Empty />
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.background
  },
  indicator: {
    backgroundColor: '#ffeb3b'
  },
  label: {
    fontWeight: '600'
  },
  tabStyle: {
    width: 'auto'
  }
})