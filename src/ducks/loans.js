import { appName } from '../config'
import { Record, List, fromJS } from 'immutable'
import { createSelector } from 'reselect'
import {
  put,
  takeEvery,
  call,
  all,
  delay,
  take,
  race
} from 'redux-saga/effects'
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

export const POLL_LOANS_REQUEST = `${prefix}/POLL_LOANS_REQUEST`
export const POLL_LOANS_START = `${prefix}/POLL_LOANS_START`
export const POLL_LOANS_STOP = `${prefix}/POLL_LOANS_STOP`

export const FETCH_LOAN_BY_ID_REQUEST = `${prefix}/FETCH_LOAN_BY_ID_REQUEST`
export const FETCH_LOAN_BY_ID_START = `${prefix}/FETCH_LOAN_BY_ID_START`
export const FETCH_LOAN_BY_ID_SUCCESS = `${prefix}/FETCH_LOAN_BY_ID_SUCCESS`
export const FETCH_LOAN_BY_ID_FAIL = `${prefix}/FETCH_LOAN_BY_ID_FAIL`

/**
 * Reducer
 */
export const ReducerRecord = Record({
  loading: false,
  entities: List([]),
  error: false,
  sortBy: 'sort-by',
  loan: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_LOANS_START:
    case FETCH_LOAN_BY_ID_START:
      return state.set('loading', true).set('error', false)

    case FETCH_LOANS_SUCCESS:
      return state
        .set('loading', false)
        .set('sortBy', 'sort-by')
        .set('entities', fromJS(payload.data))

    case FETCH_LOAN_BY_ID_SUCCESS:
      return state.set('loading', false).set('loan', fromJS(payload.data))

    case FETCH_LOANS_FAIL:
    case FETCH_LOAN_BY_ID_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('sortBy', 'sort-by')

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
              bigger = a.get(by) > b.get(by)
              smaller = a.get(by) < b.get(by)
            } else if (by === 'rating') {
              // AAAA > AAA - vice versa
              bigger = a.get('rating') < b.get('rating')
              smaller = a.get('rating') > b.get('rating')
            } else if (by === 'duration') {
              const fromA = Number(new Date(a.get('datePublished')))
              const toA = Number(new Date(a.get('deadline')))
              const diffA = toA - fromA

              const fromB = Number(new Date(b.get('datePublished')))
              const toB = Number(new Date(b.get('deadline')))
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

export const isErrorSelector = createSelector(
  loansSelector,
  (loans) => loans.get('error')
)

export const getLoansSelector = createSelector(
  loansSelector,
  (loans) => loans.get('entities').toJS()
)

export const getLoanSelector = createSelector(
  loansSelector,
  (loans) => {
    const loan = loans.get('loan')
    return loan && loan.toJS()
  }
)

export const sortLoansBySelector = createSelector(
  loansSelector,
  (loans) => loans.get('sortBy')
)

/**
 * Action Creators
 */

export const fetchAllLoans = () => ({ type: FETCH_LOANS_REQUEST })

export const fetchLoanById = (loanId) => ({
  type: FETCH_LOAN_BY_ID_REQUEST,
  payload: { loanId }
})

export const sortLoansBy = (sortBy) => ({
  type: SORT_LOANS_BY,
  payload: { sortBy }
})

export const pollLoansStart = () => ({ type: POLL_LOANS_REQUEST })
export const pollLoansStop = () => ({ type: POLL_LOANS_STOP })

/**
 * Sagas
 */
export function* pollLoansSaga() {
  while (true) {
    try {
      yield put({ type: POLL_LOANS_START })
      yield delay(5 * 60 * 1000)
      const data = yield call(api.fetchLoans)
      yield put({ type: FETCH_LOANS_SUCCESS, payload: { data } })
    } catch (err) {
      yield put({ type: FETCH_LOANS_FAIL })
    }
  }
}

export function* fetchLoansSaga() {
  try {
    yield put({ type: FETCH_LOANS_START })
    const data = yield call(api.fetchLoans)
    yield put({ type: FETCH_LOANS_SUCCESS, payload: { data } })
  } catch (error) {
    yield put({ type: FETCH_LOANS_FAIL })
  }
}

export function* fetchLoanByIdSaga({ payload }) {
  try {
    yield put({ type: FETCH_LOAN_BY_ID_START })
    const data = yield call(api.fetchLoanById, payload.loanId)
    yield put({ type: FETCH_LOAN_BY_ID_SUCCESS, payload: { data } })
  } catch (error) {
    yield put({ type: FETCH_LOAN_BY_ID_FAIL })
  }
}

export function* pollLoansWatcherSaga() {
  yield race([call(pollLoansSaga), take(POLL_LOANS_STOP)])
}

export function* saga() {
  yield all([
    takeEvery(FETCH_LOANS_REQUEST, fetchLoansSaga),
    takeEvery(FETCH_LOAN_BY_ID_REQUEST, fetchLoanByIdSaga),
    takeEvery(POLL_LOANS_REQUEST, pollLoansWatcherSaga)
  ])
}
