import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import CommonListEntry from './CommonListEntry'
import { Conversation } from '../declarations.d'

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
        , size = 256
        , image =
          user.avatarSource === 'local' ? `https://www.trustroots.org/uploads-profile/${user._id}/avatar/${size}.jpg` :
          user.avatarSource === 'facebook' ? `https://graph.facebook.com/${user.additionalProvidersData.facebook.id}/picture/?width=${size}&height=${size}` :
          user.avatarSource === 'gravatar' ? `https://gravatar.com/avatar/${user.emailHash}?s=${size}` :
          null

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