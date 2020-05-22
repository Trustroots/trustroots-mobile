import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, FlatList, StatusBar, View, Text } from 'react-native'

import colors from '../common/colors'
// import MessagesListEntry from '../components/MessagesListEntry'

type Props = {
  actions?: any
  isFocused: boolean
}

export default class Conversations extends Component<Props> {
  state = {
    refreshing: false
  }

  // componentDidUpdate(prevProps: Props) {
  //   const { actions } = this.props
  //   if (prevProps.isFocused === false && this.props.isFocused === true)
  //     actions.navigation('conversations')
  // }

  // componentDidMount() {
  //   const { actions } = this.props
  //   actions.navigation('conversations')
  //   actions.fetchConversations()
  // }

  render() {
    const { actions } = this.props
        , data = []
        , { refreshing } = this.state

    return (
      <SafeAreaView style={styles.container} testID="conversations.scene">
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        {data.length ?
          <FlatList
            keyExtractor={item => item.id.toString()}
            onRefresh={() => {
              // actions.fetchConversations()
              // setTimeout(() => this.setState({refreshing: false}), 1000)
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