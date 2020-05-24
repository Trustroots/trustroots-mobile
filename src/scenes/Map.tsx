import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { featureCollection, point } from '@turf/helpers'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OFFERS_REQUEST } from '../common/constants'
import { Offers } from '../declarations'

import config from '../common/config'
MapboxGL.setAccessToken(config.mapboxToken)

const layerStyles = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 25, 750, 30],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
}

export default () => {
  const dispatch = useDispatch()
      , offers = useSelector((state: any) => state.offers, shallowEqual) as Offers
      , shape = featureCollection(
          offers
          .filter(offer => offer.location && offer.location.length == 2)
          .map(offer => point([offer.location[1], offer.location[0]], {_id: offer._id}))
        )

  useEffect(() => {
    dispatch({type: OFFERS_REQUEST})
  }, [])

  return (
    <View style={styles.container} testID="map.scene">
      <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera
            zoomLevel={6}
            centerCoordinate={[11, 48]}
          />

          <MapboxGL.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={50}
            shape={shape}>
            <MapboxGL.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <MapboxGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <MapboxGL.CircleLayer
              id="singlePoint"
              filter={['!', ['has', 'point_count']]}
              style={layerStyles.singlePoint}
            />
          </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
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