import React from 'react';
import { StyleSheet, View } from 'react-native'

import Logo from '../assets/logo-white.svg'

const App = () => {
  return (
    <View style={styles.container}>
      <Logo height={100} width={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgreen',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
