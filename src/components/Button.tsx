import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import colors from '../common/colors'

type Props = {
  label: string,
  transparent?: boolean,
  width?: number,
  small?: boolean,
  busy?: boolean,
  onPress: () => void
}

const Button = ({label, transparent, onPress, width, small, busy}: Props) => {
  return (
    <TouchableOpacity
      disabled={!!busy}
      style={{
        ...(small ? buttonStyleSmall : buttonStyle),
        ...(transparent ? styles.transparent : styles.normal),
        ...(width ? {width} : {})
      }}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        {busy ?
          <ActivityIndicator
            size="small"
            color={colors.background}
          />
        :
          <Text style={transparent ? styles.transparentText : styles.normalText}>
            {label}
          </Text>
        }
      </View>
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
  buttonContainer: {
    height: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  normal: {
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
