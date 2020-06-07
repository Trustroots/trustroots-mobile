import React from 'react'
import { withBadge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../common/colors'
import { useSelector } from 'react-redux'

type Props = {
  focused: boolean
}

export default ({focused}: Props) => {
  const badge = useSelector((state: any) => state.app.unread)
    , Component = badge ? withBadge(badge)(Icon) : Icon

  return (
    <Component
      testID={`navigation.messages`}
      name={focused ? 'message-text' : 'message-text-outline'}
      size={32}
      style={{marginTop: 3, color:
        focused ? colors.navigationTabActive :
        colors.navigationTabInactive
      }}
    />
  )
}