import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Trustroots</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
