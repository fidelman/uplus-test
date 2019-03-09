import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import { isDevelopment } from '../config'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, routerMiddleware(history)]

if (isDevelopment) {
  middlewares.push(logger)
}

const enhancer = applyMiddleware(...middlewares)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

if (isDevelopment) window.store = store

export default store
