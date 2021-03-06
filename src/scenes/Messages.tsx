import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, FlatList, StatusBar, View, Text } from 'react-native'

import colors from '../common/colors'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGES_REQUEST } from '../common/constants'
import { Messages, User } from '../declarations'
import MessagesListEntry from '../components/MessagesListEntry'

type Props = {
  navigation: any
}

export default ({navigation}: Props) => {
  const [refreshing, setRefreshing] = useState(false)
      , dispatch = useDispatch()
      , pull = () => dispatch({type: MESSAGES_REQUEST})
      , messages: Messages = useSelector((state: any) => state.conversations)
      , me: User = useSelector((state: any) => state.profile)

  useEffect(() => {
    if (navigation) {
      pull()
      this.didFocusListener = navigation.addListener('didFocus', pull)
    }
    return () => this.didFocusListener.remove()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container} testID="conversations.scene">
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      {messages.length ?
        <FlatList
          keyExtractor={item => item._id}
          onRefresh={() => {
            pull()
            setTimeout(() => setRefreshing(false), 2000)
          }}
          refreshing={refreshing}
          style={styles.list}
          data={messages}
          renderItem={({item, index}) =>
            <MessagesListEntry
              conversation={item}
              testID={'conversations.'+index}
              isLast={index === messages.length - 1}
              isSent={item.userFrom._id === me._id}
            />
          }
        />
      : <View style={{padding: 10}}>
          <Text style={{textAlign: 'center'}}>
            Hey there!{'\n\n'}
            You have not sent or received any messages yet.
          </Text>
        </View>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.foreground,

    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1
  }
})