import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../common/colors'

type Props = {
  label: string,
  transparent?: boolean,
  width?: number,
  small?: boolean,
  onPress: () => void
}

const Button = ({label, transparent, onPress, width, small}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...(small ? buttonStyleSmall : buttonStyle),
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
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
  fontWeight: 'bold'
}

const buttonStyleSmall = {
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
}

const styles = StyleSheet.create({
  normal: {
    alignItems: 'center',
    backgroundColor: colors.button
  },

  normalText: {
    color: colors.buttonText
  },

  transparent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.foreground
  },

  transparentText: {
    color: colors.foreground,
  }
})

export default Button
