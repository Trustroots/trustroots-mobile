import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, FlatList, StatusBar, View, Text } from 'react-native'

import colors from '../common/colors'
import { useDispatch } from 'react-redux'
import { MESSAGES_REQUEST } from '../common/constants'
// import MessagesListEntry from '../components/MessagesListEntry'

type Props = {
  navigation: any
}

export default ({navigation}: Props) => {
  const [refreshing, setRefreshing] = useState(false)
      , dispatch = useDispatch()
      , pull = () => dispatch({type: MESSAGES_REQUEST})
      , data = []

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
      {data.length ?
        <FlatList
          keyExtractor={item => item.id.toString()}
          onRefresh={() => {
            pull()
            setTimeout(() => setRefreshing(false), 1000)
          }}
          refreshing={refreshing}
          style={styles.list}
          data={data}
          renderItem={({item, index}) =>
            <View><Text>foobar</Text></View>
            // <MessagesListEntry
            //   conversation={item}
            //   testID={'conversations.'+index}
            //   isLast={index === data.length - 1}
            // />
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