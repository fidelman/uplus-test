import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'loans'
const prefix = `${appName}/${moduleName}`

export const FETCH_LOANS_REQUEST = `${prefix}/FETCH_LOANS_REQUEST`
export const FETCH_LOANS_START = `${prefix}/FETCH_LOANS_START`
export const FETCH_LOANS_SUCCESS = `${prefix}/FETCH_LOANS_SUCCESS`
export const FETCH_LOANS_FAIL = `${prefix}/FETCH_LOANS_FAIL`

/**
 * Reducer
 */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: List([]),
  error: false
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_LOANS_START:
      return state.set('loading', true).set('error', false)

    case FETCH_LOANS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .update('entities', (entities) => entities.concat(payload.data))

    case FETCH_LOANS_FAIL:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('error', true)

    default:
      return state
  }
}

/**
 * Selectors
 */
export const loansSelector = (state) => state[moduleName]
export const isLoadingSelector = createSelector(
  loansSelector,
  (loans) => loans.get('loading')
)
export const isLoadedSelector = createSelector(
  loansSelector,
  (loans) => loans.get('loaded')
)
export const isErrorSelector = createSelector(
  loansSelector,
  (loans) => loans.get('error')
)

export const getLoansSelector = createSelector(
  loansSelector,
  (loans) => loans.get('entities').toJS()
)

/**
 * Action Creators
 */

export const fetchAllLoans = () => ({ type: FETCH_LOANS_REQUEST })

/**
 * Sagas
 */
export function* fetchAllSaga() {
  try {
    yield put({ type: FETCH_LOANS_START })
    const data = yield call(api.fetchLoans)
    yield put({ type: FETCH_LOANS_SUCCESS, payload: { data } })
  } catch (error) {
    yield put({ type: FETCH_LOANS_FAIL })
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_LOANS_REQUEST, fetchAllSaga)])
}
