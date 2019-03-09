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

export const SORT_LOANS_BY = `${prefix}/SORT_LOANS_BY`

/**
 * Reducer
 */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: List([]),
  error: false,
  sortBy: 'sort-by'
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

    case SORT_LOANS_BY:
      return state
        .set('sortBy', payload.sortBy)
        .update('entities', (entities) => {
          const [by, order] = payload.sortBy.split('-')

          const result = entities.sort((a, b) => {
            const dir = order.toUpperCase() === 'ASC' ? 1 : -1
            let bigger = true
            let smaller = false

            if (by === 'deadline' || by === 'amount') {
              bigger = a[by] > b[by]
              smaller = a[by] < b[by]
            } else if (by === 'rating') {
              // AAAA > AAA - vice versa
              bigger = a.rating < b.rating
              smaller = a.rating > b.rating
            } else if (by === 'duration') {
              const fromA = Number(new Date(a.datePublished))
              const toA = Number(new Date(a.deadline))
              const diffA = toA - fromA

              const fromB = Number(new Date(b.datePublished))
              const toB = Number(new Date(b.deadline))
              const diffB = toB - fromB

              bigger = diffA > diffB
              smaller = diffA < diffB
            }

            if (bigger) {
              return dir
            }
            if (smaller) {
              return ~(dir - 1)
            }
            return 0
          })
          return result
        })

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

export const sortLoansBySelector = createSelector(
  loansSelector,
  (loans) => loans.get('sortBy')
)

/**
 * Action Creators
 */

export const fetchAllLoans = () => ({ type: FETCH_LOANS_REQUEST })

export const sortLoansBy = (sortBy) => ({
  type: SORT_LOANS_BY,
  payload: { sortBy }
})

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
