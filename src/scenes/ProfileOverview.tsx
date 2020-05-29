import React from 'react'
import { StyleSheet, ScrollView, Text, ActivityIndicator, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Image from 'react-native-fast-image'
import { User } from '../declarations'
import colors from '../common/colors'
import { userImageURL, birthdayAndGender } from '../common/utils'
import moment from 'moment'

type Props = {
  username: string
}

export default ({username}: Props) => {
  const profile: User = useSelector((state: any) => state.profiles[username]) || {}
      , { width, height } = useWindowDimensions()
      , imageSize = Math.min(width, height) * .6

  return (
    <ScrollView style={styles.container}>
      {profile._id ?
        <>
          <Image
            source={{uri: userImageURL(profile, 512)}}
            style={{width: imageSize, height: imageSize}}
          />
          {!!profile.tagline &&
            <Text style={styles.tagline}>
              {profile.tagline}
            </Text>
          }
          <Text style={styles.text}>
            {birthdayAndGender(profile)}
          </Text>

          <Text style={styles.text}>
            {profile.description.replace(/<.+?>/g, '')}
          </Text>

          <Text style={styles.text}>
            Member since {moment(profile.created).format('MMM Do, YYYY')}
          </Text>

          <Text style={styles.text}>
            Online {moment(profile.seen).fromNow()}
          </Text>

          {profile.locationLiving &&
            <Text style={styles.text}>
              Lives in {profile.locationLiving}
            </Text>
          }
          {profile.locationFrom &&
            <Text style={styles.text}>
              From {profile.locationFrom}
            </Text>
          }
          {profile.languages.length &&
            <>
              <Text style={styles.label}>
                Languages
              </Text>
              <Text style={styles.text}>
                {profile.languages.join(', ')}
              </Text>
            </>
          }
        </>
      :
        <ActivityIndicator
          size="small"
          color={colors.background}
        />
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  tagline: {
    fontStyle: 'italic',
    marginTop: 5
  },
  text: {
    marginTop: 5,
  },
  label: {
    textTransform: 'uppercase',
    color: '#888',
    marginTop: 10
  }
})