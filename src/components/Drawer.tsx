import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'

// @ts-ignore
import Logo from '../../assets/logo-white.svg'

import colors from '../common/colors'
import { LOGOUT } from '../common/constants'
import DrawerButton from './DrawerButton'
import Version from './Version'
import SocialButton from './SocialButton'

export default () => {
  const dispatch = useDispatch()
      , {firstName, lastName, username} = useSelector(state => state.profile, shallowEqual)

  return (
    <View style={styles.container} testID="drawer">
      <View style={styles.header}>
        <Logo width={100} height={100} />
        <Text style={styles.username} testID="drawer.user" adjustsFontSizeToFit>
          {firstName} {lastName} ({username})
        </Text>
      </View>
      <View style={styles.content}>
        <DrawerButton
          onPress={() => dispatch({type: LOGOUT})}
          icon="exit-to-app"
          label="Logout"
        />

        <View style={styles.spacer} />
      </View>
      <View style={styles.footer}>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>
            Connect with Trustroots!
          </Text>
        </View>
        <View style={styles.social}>
          <SocialButton
            type="twitter"
            url="https://twitter.com/trustroots"
          />
          <SocialButton
            type="instagram"
            url="https://www.instagram.com/trustroots_org"
          />
          <SocialButton
            type="facebook"
            url="https://www.facebook.com/trustroots.org"
          />
        </View>

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
    backgroundColor: colors.drawerFooter,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacer: {
    height: 20
  },
  separator: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  separatorText: {
    fontSize: 12,
    color: colors.drawerGray
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
