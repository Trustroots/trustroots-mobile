import React from 'react'
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Image from 'react-native-fast-image'
import { User } from '../declarations'
import colors from '../common/colors'
import { userImageURL } from '../common/utils'

type Props = {
  username: string
}

export default ({username}: Props) => {
  const profile: User = useSelector((state: any) => state.profiles[username]) || {}
      , { width, height } = useWindowDimensions()
      , imageSize = Math.min(width, height) * .6

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {profile._id ?
        <>
          <Image
            source={{uri: userImageURL(profile, 1024)}}
            style={{width: imageSize, height: imageSize}}
          />
        </>
      :
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      }
    </View>
  )
}