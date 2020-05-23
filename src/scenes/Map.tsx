import React, { useRef, useState } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import ClusteredMapView from 'react-native-maps-super-cluster'

import MapCluster from '../components/MapCluster'
import MapMarker from '../components/MapMarker'

const defaultZoom = {
        longitudeDelta: 1.1,
        latitudeDelta: 1.1
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
      , [tracking, setTracking] = useState(false)

      , data = []
      , initialRegion = {longitude: 40, latitude: 10, ...defaultZoom}
      // , initialRegion = profile.lat && profile.lon ?
      //     {
      //       longitude: parseFloat(profile.lon),
      //       latitude: parseFloat(profile.lat),
      //       ...defaultZoom
      //     } : config.initialMapRegion

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