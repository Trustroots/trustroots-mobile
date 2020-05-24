import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import ClusteredMapView from 'react-native-maps-super-cluster'

import MapCluster from '../components/MapCluster'
import MapMarker from '../components/MapMarker'
import { useDispatch, useSelector } from 'react-redux'
import { OFFERS_REQUEST } from '../common/constants'
import { Offers } from '../declarations'

const defaultZoom = {
        longitudeDelta: 32,
        latitudeDelta: 32
      }

      // markers[type].map(marker => ({
      //   type,
      //   id: marker.id,
      //   location: {
      //     latitude: parseFloat(marker.lat),
      //     longitude: parseFloat(marker.lon)
      //   }
      // }))

export default () => {
  const mapRef = useRef(null) as ClusteredMapView
      , dispatch = useDispatch()
      , [tracking, setTracking] = useState(false)
      , offers = useSelector((state: any) => state.offers) as Offers
      , data = offers.filter(offer => offer.location && offer.location.length == 2).map(offer => ({
        id: offer._id,
        location: {
          latitude: offer.location[0],
          longitude: offer.location[1]
        }
      }))
      , initialRegion = {latitude: 48, longitude: 11, ...defaultZoom}
      // , initialRegion = profile.lat && profile.lon ?
      //     {
      //       longitude: parseFloat(profile.lon),
      //       latitude: parseFloat(profile.lat),
      //       ...defaultZoom
      //     } : config.initialMapRegion

  useEffect(() => {
    dispatch({type: OFFERS_REQUEST})
  }, [])

  return (
    <View style={styles.container} testID="map.scene">
      <ClusteredMapView
        ref={mapRef}
        data={data}
        style={styles.map}

        initialRegion={initialRegion}

        radius={40}

        onUserLocationChange={async ({coordinate}) => {
          if (Platform.OS === 'ios')
            return

          const camera = await this.refs.map.getCamera()
          camera.center = {...coordinate}
          mapRef.current.animateCamera(camera, {duration: 300})
        }}

        edgePadding={{left: 40, top: 40, right: 40, bottom: 40}}

        showsUserLocation={tracking}
        animateClusters={false}

        renderMarker={marker =>
          <MapMarker
            key={'marker.'+marker.id}
            marker={marker}
            onPress={() => false}
          />
        }

        renderCluster={(cluster, onPress) =>
          <MapCluster
            key={'cluster.'+cluster.id}
            cluster={cluster}
            onPress={onPress}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
})