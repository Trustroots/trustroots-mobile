import React from 'react'
import { withBadge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../common/colors'

type Props = {
  focused: boolean
}

export default ({focused}: Props) => {
  const badge = 10
      , Component = badge ? withBadge(badge)(Icon) : Icon

  return (
    <Component
      testID={`navigation.messages`}
      name="wechat"
      size={32}
      style={{marginTop: 3, color:
        focused ? colors.navigationTabActive :
        colors.navigationTabInactive
      }}
    />
  )
}