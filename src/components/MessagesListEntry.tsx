import React from 'react'
import { Actions } from 'react-native-router-flux'

import CommonListEntry from './CommonListEntry'
import { Conversation } from '../declarations.d'
import { userImageURL } from '../common/utils'

type Props = {
  conversation: Conversation
  testID: string,
  isLast: boolean,
  isSent: boolean
}

export default ({conversation, testID, isLast, isSent}: Props) => {
  const { message: {excerpt}, _id, read, userTo, userFrom, updated } = conversation
      , user = isSent ? userTo : userFrom

  return (
    <CommonListEntry
      picture={userImageURL(user, 256)}
      onPress={() => Actions.jump('conversation', {conversationId: _id})}
      testID={testID}
      title={user.displayName}
      timestamp={Date.parse(updated)}
      subtitlePhoto={isSent ? userImageURL(userFrom, 256) : null}
      subtitle={excerpt}
      isLast={isLast}
      isUnread={!read}
    />
  )
}