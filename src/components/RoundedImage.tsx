import React from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, ImageProps } from 'react-native'
import Image from 'react-native-fast-image'

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    aspectRatio: 1
  }
})

interface Props {
  uri: string,
  size: number
}

export default ({uri, size}: Props) =>
  <View style={[styles.container, {borderRadius: size / 2, width: size, height: size}]}>
    <Image
      style={{flex: 1}}
      resizeMode="contain"
      source={{uri}}
    />
  </View>