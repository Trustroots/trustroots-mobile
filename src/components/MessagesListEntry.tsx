import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import CommonListEntry from './CommonListEntry'

type Props = {
  conversation: {member: string[]} & ConversationListEntry,
  testID: string,
  isLast: boolean,
  foodsavers: {string: User},
  profile: Profile
}

class ConversationsItem extends Component<Props> {
  render() {
    const { conversation, testID, isLast, profile } = this.props
        , { id, name, last_ts, last_message } = conversation

        // , lastMessenger = member.find(member => member === last_foodsaver_id)
        , isUnread = conversation.unread !== "0"
        , title = name

    return <CommonListEntry
      pictures={[]}
      onPress={() => Actions.jump('conversation', {conversationId: id})}
      testID={testID}
      title={title}
      timestamp={parseInt(last_ts)*1000}
      subtitlePhoto={null}
      subtitle={last_message}
      isLast={isLast}
      isUnread={isUnread}
    />
  }
}
