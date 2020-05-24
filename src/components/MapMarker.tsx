import React from 'react'
import { Marker } from 'react-native-maps'
import { Offer } from '../declarations'

const icons = {
        maybe: require('../../assets/marker-maybe.png'),
        yes: require('../../assets/marker-yes.png'),
        meet: require('../../assets/marker-meet.png'),
      }

type Props = {
  marker: any
  onPress?: () => void
}

export default ({marker, onPress}: Props) => {
  console.log(marker)
  return <Marker
    testID={`marker.${marker._id}`}
    image={icons.yes}
    coordinate={marker.location}
    anchor={{x: 0.5, y: 1}}
    onPress={onPress}
    centerOffset={{x: 1, y: -12}}
  />
}