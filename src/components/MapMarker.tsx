import React from 'react'
import { Marker } from 'react-native-maps'
import { Offer } from '../declarations'

const icons = {
        maybe: require('../../assets/marker-maybe.png'),
        yes: require('../../assets/marker-yes.png'),
        meet: require('../../assets/marker-meet.png')
      }

type Props = {
  marker: Offer
  onPress?: () => void
}

export default ({marker, onPress}: Props) => {
  return <Marker
    testID={`marker.${marker._id}`}
    image={icons.yes}
    coordinate={{latitude: marker.location[1], longitude: marker.location[0]}}
    anchor={{x: 0.5, y: 1}}
    onPress={onPress}
    centerOffset={{x: 1, y: -12}}
  />
}