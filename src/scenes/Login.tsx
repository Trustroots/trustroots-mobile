import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'

import BackButton from '../components/BackButton'
import Background from '../components/Background'
import Button from '../components/Button'
// import Button from '../components/Button'

const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' animated />
      <Background image={require('../../assets/background.nordic.jpg')} />
      <BackButton />

      <Text>Email or username</Text>
      <Text>Password</Text>

      <Button
        label="Login"
        small
        onPress={() => false}
      />

      <Text>Forgot?</Text>

      <Button
        label="Become a member"
        transparent
        small
        onPress={() => false}
      />
      <Text>or Back home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
})

export default Login
