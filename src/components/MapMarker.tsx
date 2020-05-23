import React from 'react'
import { Marker } from 'react-native-maps'

const icons = {
        maybe: require('../../assets/marker-maybe.png'),
        yes: require('../../assets/marker-yes.png')
      }

type Props = {
  marker: {
    id?: number
    location: {
      latitude: number,
      longitude: number,
    }
  }
  onPress?: () => void
}

export default ({marker, onPress}: Props) => {
  return <Marker
    testID={`marker.${marker.id}`}
    image={icons.yes}
    coordinate={marker.location}
    anchor={{x: 0.5, y: 1}}
    onPress={onPress}
    centerOffset={{x: 1, y: -12}}
  />
}