import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import colors from '../common/colors'

type Props = {
  label: string,
  transparent?: boolean
}

const Button = ({label, transparent}: Props) => {
  return (
    <View style={transparent ? styles.transparent : styles.normal}>
      <Text style={transparent ? styles.transparentText : styles.normalText}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  normal: {
    marginTop: 20,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.button
  },

  normalText: {
    color: colors.buttonText
  },

  transparent: {
    marginTop: 20,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.foreground
  },

  transparentText: {
    color: colors.foreground,
    fontWeight: 'bold'
  }
})

export default Button
