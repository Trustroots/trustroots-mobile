import React from 'react'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import RoundedImage from '../components/RoundedImage'
import { User } from '../declarations'
import colors from '../common/colors'
import { userImageURL, birthdayAndGender } from '../common/utils'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  username: string
}

const section = (label: string, withSeparator: boolean = true) =>
  <>
    {!!withSeparator && <View style={styles.separator} />}
    <Text style={styles.sectionHeader}>
      {label}
    </Text>
  </>

const info = (label: string, info: string) =>
  <Text style={styles.text}>
    {label ? label + ' ' : ''}
    <Text style={styles.bold}>
      {info}
    </Text>
  </Text>

const button = (label: string, onPress: () => void) =>
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
  >
    <Text>
      {label}</Text>
  </TouchableOpacity>


export default ({username}: Props) => {
  const profile: User = useSelector((state: any) => state.profiles[username]) || {}
      , { width, height } = useWindowDimensions()
      , imageSize = Math.min(width, height) * .5

  return (
    <ScrollView style={styles.container}>
      {profile._id ?
        <>
          <View style={styles.centered}>
            <RoundedImage
              uri={userImageURL(profile, 512)}
              size={imageSize}
            />
            <Text style={styles.name}>
              {profile.displayName}
            </Text>

            {!!profile.tagline &&
              <Text style={styles.tagline}>
                {profile.tagline}
              </Text>
            }

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text>Write</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Add Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>...</Text>
              </TouchableOpacity>
            </View>
          </View>

          {section('Accommodation', false)}

          <View style={styles.accommodation}>
            <View style={styles.hosting} />
            <Text>Might be able to host</Text>
          </View>

          {button('See details', () => null)}

          {section('Basic info', true)}

          {info('Online', moment(profile.seen).fromNow())}

          {info('', birthdayAndGender(profile))}

          {info('Member since', moment(profile.created).format('MMM Do, YYYY'))}

          {!!profile.locationLiving && info('Lives in', profile.locationLiving)}

          {!!profile.locationFrom && info('From', profile.locationFrom)}

          {!!profile.languages.length &&
            info('Languages', profile.languages.join(', '))
          }
          {button('Read more', () => null)}

          {section('Contacts', true)}

          {section('Tribes', true)}

          {section('Elsewhere', true)}
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
  centered: {
    alignItems: 'center',
    paddingTop: 20
  },
  name: {
    marginTop: 20,
    fontSize: 18
  },
  tagline: {
    marginTop: 10
  },
  section: {
    marginTop: 10
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  text: {
    marginTop: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  label: {
    textTransform: 'uppercase',
    color: '#888',
    marginTop: 10
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 3,
    marginRight: 3,
    borderColor: colors.background,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center'
  },
  accommodation: {
    flexDirection: 'row',
  },
  hosting: {
    width: 20,
    height: 20,
    backgroundColor: colors.hostingMaybe,
    borderRadius: 10,
    marginRight: 10
  },
  separator: {
    height: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#888'
  },
})