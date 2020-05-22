import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../common/colors'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

type Props = {
  type: 'instagram' | 'twitter' | 'facebook',
  url: string
}

export default class SocialButton extends PureComponent<Props> {
  render() {
    const { type, url } = this.props
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
        style={styles.container}
        testID={`social.${type}`}
      >
        <Icon
          name={type}
          size={26}
          color={colors.drawerSocialIcon}
        />
      </TouchableOpacity>
    )
  }
}