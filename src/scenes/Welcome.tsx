import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Logo from '../../assets/logo-white.svg'
import colors from '../common/colors'
import style from '../common/styles'
import Button from '../components/Button'
import Background from '../components/Background'
import Version from '../components/Version'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' animated />
      <Background image={require('../../assets/background.jpg')} />

      <Logo height={150} width={150} />

      <Text style={styles.title}>
        Travellers' community
      </Text>
      <Text style={styles.subtitle}>
        Sharing, hosting and getting people together.
      </Text>

      <View style={styles.spacer} />

      <Button
        label="Join Trustroots now"
        width={200}
        onPress={() => null}
      />

      <View style={styles.spacer} />

      <Button
        label="Login"
        width={200}
        transparent
        onPress={() => Actions.push('login')}
      />

      <Version />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...style.shadow,
    textShadowRadius: 6,
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.foreground,
    textAlign: 'center'
  },
  subtitle: {
    ...style.shadow,
    textShadowRadius: 4,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    color: colors.foreground,
    textAlign: 'center'
  },
  spacer: {
    height: 20
  }
})

export default Welcome
