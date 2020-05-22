import React from 'react'
import { Image, useWindowDimensions } from 'react-native'

type Props = {
  image: any
}

export default ({image}: Props) => {
  const { width, height } = useWindowDimensions()
  return (
    <Image
      style={{width, height, position: 'absolute'}}
      source={image}
      resizeMode='cover'
    />
  )
}