import React from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'
import colors from '../common/colors'
import { User } from '../declarations'

type Props = {
  username: string
}

export default ({username}: Props) => {
  const profile: User = useSelector((state: any) => state.profiles[username], shallowEqual)

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        adjustsFontSizeToFit={true}
      >
        {profile && profile.displayName}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  title: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 17,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left'
  },
})