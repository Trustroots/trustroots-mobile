import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer } from 'redux-persist'

import reducers from '../reducers'
import sagas from '../sagas'

declare var window: { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any }

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducers)
    , sagaMiddleware = createSagaMiddleware()
    , composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    , middleware = [sagaMiddleware]
    , enhancer = composeEnhancers(applyMiddleware(...middleware))

export const store = createStore(persistedReducer, enhancer)

// @ts-ignore
export const persistor = persistStore(store)

sagaMiddleware.run(sagas)
