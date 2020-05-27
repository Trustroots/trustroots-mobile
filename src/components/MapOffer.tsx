import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { useSelector } from 'react-redux'

import colors from '../common/colors'

type Props = {
  id: string,
  height: number
}

export default ({id, height}: Props) => {
  const offer = useSelector((state: any) => state.offers.offers[id])

  return (
    <View style={[styles.container, {height}]}>
      {offer ?
        <View>
          <Text>{offer._id}</Text>
        </View>
      :
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    backgroundColor: colors.foreground,
    alignItems: 'center',
    justifyContent: 'center'
  }
})