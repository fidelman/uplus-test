import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import reducer from './reducer'
import history from '../history'
import { isDevelopment } from '../config'

const middlewares = [routerMiddleware(history)]

if (isDevelopment) {
  middlewares.push(logger)
}

const enhancer = applyMiddleware(...middlewares)

const store = createStore(reducer, enhancer)

if (isDevelopment) window.store = store

export default store
