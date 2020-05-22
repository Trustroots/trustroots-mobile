import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'

// @ts-ignore
import Logo from '../../assets/logo-white.svg'

import colors from '../common/colors'
import { LOGOUT } from '../common/constants'
import DrawerButton from './DrawerButton'
import Version from './Version'

export default () => {
  const dispatch = useDispatch()
      , name = 'Test name'

  return (
    <View style={styles.container} testID="drawer">
      <View style={styles.header}>
        <Logo width={100} height={100} />
        <Text style={styles.username} testID="drawer.user">
          {name}
        </Text>
      </View>
      <View style={styles.content}>
        <DrawerButton
          onPress={() => dispatch({type: LOGOUT})}
          icon="exit-to-app"
          label="Logout"
        />
      </View>
      <View style={styles.footer}>
        <Version />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawerBackground,
    paddingTop: isIphoneX() ? 24 : 0
  },
  header: {
    height: 130,
    marginTop: 20,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    marginTop: 4,
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
