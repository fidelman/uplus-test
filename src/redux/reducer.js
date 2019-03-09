import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import loansReducer, { moduleName as loansModule } from '../ducks/loans'

const reducers = {
  router: connectRouter(history),
  [loansModule]: loansReducer
}

export default combineReducers(reducers)
