import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Image from 'react-native-fast-image'
import colors from '../common/colors'
import { Offer, User } from '../declarations'
import { userImageURL, calculateAge } from '../common/utils'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

type Props = {
  id: string,
  height: number
}

export default ({id, height}: Props) => {
  const offer: Offer = useSelector((state: any) => state.offers.offers[id])
      , ownTribes = new Set(useSelector((state: any) => (state.profile as User).memberIds) || [])
      , tribesInCommon = !offer ? [] :
        (offer.user.member || [])
        .filter(membership => ownTribes.has(membership.tribe._id))
        .map(membership => membership.tribe)

  return (
    <TouchableOpacity
      style={[styles.container, {height}]}
      activeOpacity={0.7}
      onPress={() => Actions.push('profile')}
    >
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
            <Text style={styles.name}>{offer.user.displayName}</Text>
            <Text style={styles.username}>@{offer.user.username}</Text>
            <Text style={styles.ageGender}>
              {offer.user.birthdate ? calculateAge(offer.user.birthdate) + ' years, ' : ''}
              {offer.user.gender}
            </Text>
            <ScrollView style={styles.scroll}>
              <Text style={styles.description}>
                {offer.description.replace(/<.+?>/g, '')}
              </Text>
            </ScrollView>
            {offer.type === 'meet' &&
              <Text style={styles.updatedAgo}>
                Updated {moment(offer.updated).fromNow()}
              </Text>
            }
            {!!tribesInCommon.length &&
              <>
                <Text style={styles.tribesTitle}>
                  Tribes in common
                </Text>
                <Text style={styles.tribes}>
                  {tribesInCommon.map(tribe => tribe.label).join(' - ')}
                </Text>
              </>
            }
          </View>
        </View>
      :
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    padding: 10,
    backgroundColor: colors.foreground,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
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
    fontSize: 12
  },
  ageGender: {
    color: '#888',
    fontSize: 12
  },
  scroll: {
    flex: 1
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    color: '#000',
  },
  updatedAgo: {
    marginTop: 10,
    fontSize: 12,
    color: '#888'
  },
  tribesTitle: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase'
  },
  tribes: {
    fontSize: 12
  }
})