import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Image from 'react-native-fast-image'
import colors from '../common/colors'
import { Offer } from '../declarations'
import { userImageURL, calculateAge } from '../common/utils'

type Props = {
  id: string,
  height: number
}

export default ({id, height}: Props) => {
  const offer: Offer = useSelector((state: any) => state.offers.offers[id])

  return (
    <View style={[styles.container, {height}]}>
      {offer ?
        <View style={styles.row}>
          <View style={styles.left}>
            <Image
              style={{width: 128, height: 128}}
              source={{uri: userImageURL(offer.user, 256)}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.right}>
            <Text>
              <Text style={styles.name}>{offer.user.displayName}{' '}</Text>
              <Text style={styles.username}>@{offer.user.username}</Text>
            </Text>
            <Text style={styles.ageGender}>
              {offer.user.birthdate ? calculateAge(offer.user.birthdate) + ' years, ' : ''}
              {offer.user.gender}
            </Text>
            <Text style={styles.description}>
              {offer.description.replace(/<.+?>/g, '')}
            </Text>
          </View>
        </View>
      :
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    padding: 5,
    backgroundColor: colors.foreground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  left: {
    width: 140
  },
  right: {
    flex: 1
  },
  name: {
    color: '#000'
  },
  username: {
    color: '#888',
    fontSize: 10
  },
  ageGender: {
    color: '#888',
    fontSize: 10
  },

  description: {
    marginTop: 10,
    fontSize: 12
  }
})