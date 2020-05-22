import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../common/colors'

type Props = {
  label: string,
  transparent?: boolean,
  width?: number,
  onPress: () => void
}

const Button = ({label, transparent, onPress, width}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...(transparent ? styles.transparent : styles.normal),
        ...(width ? {width} : {})
      }}
      onPress={onPress}
    >
      <Text style={transparent ? styles.transparentText : styles.normalText}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const buttonStyle = {
  marginTop: 20,
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
}

const styles = StyleSheet.create({
  normal: {
    ...buttonStyle,
    alignItems: 'center',
    backgroundColor: colors.button
  },

  normalText: {
    color: colors.buttonText
  },

  transparent: {
    ...buttonStyle,
    alignItems: 'center',
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
