import React from 'react'
import { View, StatusBar } from 'react-native'

import colors from '../common/colors'

export default () =>
  <View style={{backgroundColor: colors.background, flex: 1}}>
    <StatusBar backgroundColor={colors.background} barStyle="light-content" />
  </View>