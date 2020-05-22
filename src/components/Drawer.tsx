import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../common/colors'
import { isIphoneX } from 'react-native-iphone-x-helper'

import DrawerButton from './DrawerButton'

import Version from './Version'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawerBackground,
    paddingTop: isIphoneX() ? 24 : 0
  },
  header: {
    height: 80,
    marginTop: 20,
    paddingLeft: 12,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  username: {
    color: colors.drawerUser
  },
  content: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.drawerContent
  },
  footer: {
    backgroundColor: colors.drawerContent,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = {
  profile: any
  actions: any
}

export default class Drawer extends Component<Props> {
  render() {
    const name = 'Test name'

    return (
      <View style={styles.container} testID="drawer">
        <View style={styles.header}>
          <Text style={styles.username} testID="drawer.user">
            {name}
          </Text>
        </View>
        <View style={styles.content}>
          <DrawerButton
            onPress={() => false}
            icon="exit-to-app"
            label="drawer.logout"
          />
        </View>
        <View style={styles.footer}>
          <Version />
        </View>
      </View>
    )
  }
}
