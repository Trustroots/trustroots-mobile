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
      onPress={() => Actions.push('profile', {username: offer.user.username})}
    >
      {offer ?
        <View style={styles.row}>
          <View style={styles.left}>
            <Image
              style={{width: 128, height: 128}}
              source={{uri: userImageURL(offer.user, 256)}}
              resizeMode="contain"
            />
            {offer.type === 'host' &&
              <View style={styles.status}>
                {offer.status === 'maybe' ?
                  <Text style={styles.hostingMaybe}>
                    maybe hosting
                  </Text>
                :
                  <Text style={styles.hostingYes}>
                    hosting
                  </Text>
                }
              </View>
            }
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: colors.foreground,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  left: {
    width: 128
  },
  right: {
    flex: 1,
    paddingLeft: 10
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
    flex: 1,
    marginTop: 5
  },
  description: {
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
  },
  status: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  hostingTitle: {
    fontSize: 12,
    color: '#888',
    paddingTop: 5,
    paddingBottom: 5
  },
  hostingMaybe: {
    borderRadius: 5,
    backgroundColor: colors.hostingMaybe,
    color: colors.foreground,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    textAlignVertical: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold'
  },
  hostingYes: {
    borderRadius: 5,
    backgroundColor: colors.hostingYes,
    color: colors.foreground,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    textAlignVertical: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  }
})