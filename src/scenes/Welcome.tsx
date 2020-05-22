import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Logo from '../../assets/logo-white.svg'
import colors from '../common/colors'
import style from '../common/styles'
import Button from '../components/Button'
import Background from '../components/Background'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Background image={require('../../assets/background.jpg')} />

      <Logo height={150} width={150} />

      <Text style={styles.title}>
        Travellers' community
      </Text>
      <Text style={styles.subtitle}>
        Sharing, hosting and getting people together.
      </Text>

      <Button
        label="Join Trustroots now"
        width={200}
        onPress={() => null}
      />

      <Button
        label="Login"
        width={200}
        transparent
        onPress={() => Actions.push('login')}
      />
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
  }
})

export default Welcome
