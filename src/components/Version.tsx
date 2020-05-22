import React , { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import colors from '../common/colors'

import CookieManager from 'react-native-cookies'
import AsyncStorage from '@react-native-community/async-storage'

import { useDispatch } from 'react-redux'
import { LOGOUT } from '../common/constants'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5
  },
  text: {
    color: colors.version,
    fontSize: 10
  }
})

export default () => {
  const dispatch = useDispatch()
      , [version, setVersion] = useState({
          number: '',
          build: ''
        })

  useEffect(() => {
    Promise.all([
      DeviceInfo.getVersion(),
      DeviceInfo.getBuildNumber()
    ]).then(result =>
      setVersion({number: result[0], build: result[1]})
    )
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        CookieManager.clearAll()
        AsyncStorage.clear()
        dispatch({type: LOGOUT})
      }}
    >
      <Text style={styles.text}>Version {version.number} (build #{version.build})</Text>
    </TouchableOpacity>
  )
}