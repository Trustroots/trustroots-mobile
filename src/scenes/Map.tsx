import React, { useEffect, useRef } from 'react'
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
    circleColor: [
      'match',
      ['get', 'type'],
      'meet',
      '#59BA58',
      'yes',
      '#0081A1',
      'maybe',
      '#F2AE44',
      '#ccc'
    ],
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 10,
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
      , ref: any = useRef()
      , camera: any = useRef()
      , offers = useSelector((state: any) => state.offers, shallowEqual) as Offers
      , shape = featureCollection(
          offers
          .filter(offer => offer.location && offer.location.length == 2)
          .map(offer => point([offer.location[1], offer.location[0]], {
            id: offer._id,
            type: offer.type === 'meet' ? 'meet' : offer.status
          }))
        )

  useEffect(() => {
    dispatch({type: OFFERS_REQUEST})
  }, [])

  return (
    <View style={styles.container} testID="map.scene">
      <MapboxGL.MapView
        ref={ref}
        style={styles.map}
        logoEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onPress={async event => {
          console.log(event)
          const { screenPointX, screenPointY } = event.properties
              , points = await ref.current.queryRenderedFeaturesAtPoint(
                [screenPointX, screenPointY],
                null,
                ['clusteredPoints', 'singlePoint']
              )

          if (!points.features.length)
            return

          const { properties: { cluster, type, id }, geometry: { coordinates } } = points.features[0]
          console.log(await ref.current.getZoom())
          if (cluster) {
            camera.current.setCamera({
              centerCoordinate: coordinates,
              zoomLevel: (await ref.current.getZoom()) + 2,
              animationDuration: 500
            })
          } else
            console.log(type, id)
        }}
      >
        <MapboxGL.Camera
          ref={camera}
          zoomLevel={6}
          centerCoordinate={[11, 48]}
        />

        <MapboxGL.ShapeSource
          id="offers"
          cluster
          clusterRadius={50}
          shape={shape}
          onPress={(s) => console.log(JSON.stringify(s, null, 2))}
        >
          <MapboxGL.SymbolLayer
            id="pointCount"
            // @ts-ignore
            style={layerStyles.clusterCount}
          />

          <MapboxGL.CircleLayer
            id="clusteredPoints"
            belowLayerID="pointCount"
            filter={['has', 'point_count']}
            // @ts-ignore
            style={layerStyles.clusteredPoints}
          />

          <MapboxGL.CircleLayer
            id="singlePoint"
            filter={['!', ['has', 'point_count']]}
            // @ts-ignore
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