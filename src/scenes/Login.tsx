import React from 'react'
import { StyleSheet, Platform, View, Text, StatusBar, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import BackButton from '../components/BackButton'
import Background from '../components/Background'
import Button from '../components/Button'

import { Form } from 'react-redux-form/native'
import LoginTextInput from '../components/LoginTextInput'
import colors from '../common/colors'
import { Actions } from 'react-native-router-flux'

type ButtonRowProps = {
  label: string,
  text: string,
  onButtonPress: () => void,
  onTextPress: () => void,
  transparent?: boolean,
  width?: number,
  middle?: string
}

const ButtonRow = ({label, width, text, transparent, onButtonPress, onTextPress, middle}: ButtonRowProps) =>
  <View style={styles.row}>
    <Button
      label={label}
      small
      transparent={transparent}
      width={width}
      onPress={onButtonPress}
    />

    <TouchableOpacity
      style={styles.textButton}
      onPress={onTextPress}
    >
      <Text>
        {middle && <Text style={styles.middle}>
          {middle + "   "}
        </Text>}
        <Text style={styles.right}>
          {text}
        </Text>
      </Text>
    </TouchableOpacity>
  </View>

const Login = () => {
  return (
    <SafeAreaView style={styles.container} testID="login.scene">
      <StatusBar barStyle='light-content' animated />
      <Background image={require('../../assets/background.nordic.jpg')} />

      <KeyboardAvoidingView
          enabled
          style={styles.form}
          {...(Platform.OS === 'ios' ? {behavior: 'padding'} : {})}
      >
        <BackButton />
        <Form model="login">
          <LoginTextInput
            icon="account"
            placeholder="Email or username"
            model=".email"
          />

          <LoginTextInput
            icon="key"
            placeholder="Password"
            obfuscate
            model=".password"
          />
        </Form>

        <ButtonRow
          label="Login"
          text="Forgot?"
          width={100}
          onButtonPress={() => null}
          onTextPress={() => null}
        />

        <View style={styles.spacer} />

        <ButtonRow
          onButtonPress={() => null}
          onTextPress={() => Actions.pop()}
          label="Become a member"
          middle="or"
          text="Back home"
          transparent
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  form: {
    flex:  1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  middle: {
    fontSize: 12,
    color: colors.foreground
  },

  right: {
    fontSize: 12,
    color: colors.foreground,
    textDecorationLine: 'underline'
  },

  row: {
    flexDirection: 'row'
  },

  textButton: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },

  spacer: {
    height: 40
  }
})

export default Login
