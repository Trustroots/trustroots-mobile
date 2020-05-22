import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BackButton from '../components/BackButton'

// import Button from '../components/Button'

const Login = () => {
  return (
    <View style={styles.container}>
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
