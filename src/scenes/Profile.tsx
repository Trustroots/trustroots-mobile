import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TabView, TabBar, SceneMap, NavigationState, SceneRendererProps } from 'react-native-tab-view'
import Empty from './Empty'
import colors from '../common/colors'

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

const renderScene = SceneMap({
  overview: Empty,
  about: Empty,
  tribes: Empty,
  hosting: Empty,
  contacts: Empty
})

const renderTabBar = (
  props: SceneRendererProps & { navigationState: TabState}
) => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
  />
)

export default () => {
  const [index, setIndex] = React.useState(1)
  return (
    <TabView
      navigationState={{routes, index}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
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