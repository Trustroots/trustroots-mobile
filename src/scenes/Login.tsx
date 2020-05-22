import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'

import BackButton from '../components/BackButton'
import Background from '../components/Background'
// import Button from '../components/Button'

const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' animated />
      <Background image={require('../../assets/background.nordic.jpg')} />

      <BackButton />
      <Text>login</Text>
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
