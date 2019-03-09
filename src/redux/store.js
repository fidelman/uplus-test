import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'
import { isDevelopment } from '../config'

const middlewares = []

if (isDevelopment) {
  middlewares.push(logger)
}

const enhancer = applyMiddleware(...middlewares)

const store = createStore(reducer, enhancer)

if (isDevelopment) window.store = store

export default store
