import React, { useEffect, useRef, useState, RefObject } from 'react'
import { StyleSheet, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { featureCollection, point } from '@turf/helpers'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { OFFER_REQUEST, OFFERS_REQUEST } from '../common/constants'
import { Pois } from '../declarations'

import colors from '../common/colors'
import config from '../common/config'
import MapOffer from '../components/MapOffer'

MapboxGL.setAccessToken(config.mapboxToken)

const overlayHeight = 180

const layerStyles = {
  selectedPoint: {
    circleColor: '#f00',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 15,
    circlePitchAlignment: 'map',
  },
  singlePoint: {
    circleColor: [
      'match',
      ['get', 'type'],
      'yes',
      '#59BA58',
      'maybe',
      '#F2AE44',
      'meet',
      '#0081A1',
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

    circleRadius: ['step', ['get', 'point_count'], 15, 100, 20, 750, 25],

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
      , map: RefObject<MapboxGL.MapView> = useRef()
      , camera: RefObject<MapboxGL.Camera> = useRef()
      , offers: Pois = useSelector((state: any) => state.offers.pois, shallowEqual) || []
      , [showOfferId, setShowOfferId] = useState(null)
      , shape = featureCollection(
          offers
          .filter(offer => offer.location && offer.location.length == 2)
          .map(offer => point([offer.location[1], offer.location[0]], {
            id: offer._id,
            type: offer.type === 'meet' ? 'meet' : offer.status
          }))
        )
      , onPress = async ({features}) => {
        const { properties: { cluster, id }, geometry: { coordinates } } = features[0]
        if (cluster) {
          camera.current.setCamera({
            centerCoordinate: coordinates,
            zoomLevel: (await map.current.getZoom()) + 2,
            animationDuration: 500
          })
        } else {
          dispatch({type: OFFER_REQUEST, payload: id})

          const point = await map.current.getPointInView(coordinates)

          camera.current.moveTo(
            await map.current.getCoordinateFromView([
              point[0],
              point[1] + overlayHeight / 2
            ]),
            500
          )
          setShowOfferId(id)
        }
      }

  useEffect(() => {
    dispatch({type: OFFERS_REQUEST})
  }, [])

  return (
    <View style={styles.container} testID="map.scene">
      <MapboxGL.MapView
        ref={map}
        style={styles.map}
        logoEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onPress={() => setShowOfferId(null)}
      >
        <MapboxGL.Camera
          ref={camera}
          zoomLevel={2.7}
          centerCoordinate={[11, 48]}
        />

        <MapboxGL.ShapeSource
          id="offers"
          cluster
          clusterRadius={30}
          shape={shape}
          onPress={onPress}
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
            id="selectedPoint"
            filter={['==', 'id', showOfferId]}
            // @ts-ignore
            style={layerStyles.selectedPoint}
          />

          <MapboxGL.CircleLayer
            id="singlePoint"
            filter={['!', ['has', 'point_count']]}
            // @ts-ignore
            style={layerStyles.singlePoint}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      {showOfferId && <MapOffer id={showOfferId} height={overlayHeight} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  offer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    height: 300,
    backgroundColor: colors.foreground
  }
})