import React from 'react'
import { withBadge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Platform } from 'react-native'

import colors from '../common/colors'

export default () => {
  const unread = 0
    , Component = unread ?
                  withBadge(unread, {badgeStyle: {backgroundColor: colors.background}})(Icon) :
                  Icon

  return (
    <Component
      testID={`navigation.drawer`}
      name="menu"
      size={26}
      style={{color: colors.drawerButton, marginTop: Platform.OS === 'ios' ? 4 : 0}}
    />
  )
}
