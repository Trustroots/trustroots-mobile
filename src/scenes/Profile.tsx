import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TabView, TabBar, NavigationState, SceneRendererProps } from 'react-native-tab-view'
import Empty from './Empty'
import colors from '../common/colors'

import ProfileOverview from './ProfileOverview'
import { useDispatch, useSelector } from 'react-redux'
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
  { key: 'hosting', title: 'Hosting' },
  { key: 'tribes', title: 'Tribes' },
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
      , me: string = useSelector((state: any) => state.profile.username)
      , display = username || me
      , dispatch = useDispatch()

  useEffect(() => {
    if (display)
      dispatch({type: PROFILE_REQUEST, payload: display})
  }, [display])

  return (
    <TabView
      navigationState={{routes, index}}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      renderScene={({route}) => {
        switch(route.key) {
          case 'overview': return <ProfileOverview username={display} />
          default: return <Empty />
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.tabBackground
  },
  indicator: {
    backgroundColor: colors.tabIndicator
  },
  label: {
    fontWeight: '600',
    color: colors.tabText
  },
  tabStyle: {
    width: 'auto'
  }
})