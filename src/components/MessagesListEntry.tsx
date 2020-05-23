import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import CommonListEntry from './CommonListEntry'
import { Conversation } from '../declarations.d'
import { userImageURL } from '../common/utils'

type Props = {
  conversation: Conversation
  testID: string,
  isLast: boolean,
}

export default class ConversationsItem extends Component<Props> {
  render() {
    const { conversation, testID, isLast } = this.props
        , { message: {excerpt}, _id, read, userTo, userFrom, updated } = conversation
        , user = userFrom
        , image = userImageURL(user, 256)

    return <CommonListEntry
      picture={image}
      onPress={() => Actions.jump('conversation', {conversationId: _id})}
      testID={testID}
      title={user.displayName}
      timestamp={Date.parse(updated)}
      subtitlePhoto={null}
      subtitle={excerpt}
      isLast={isLast}
      isUnread={!read}
    />
  }
}