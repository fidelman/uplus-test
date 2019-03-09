import { spawn } from 'redux-saga/effects'
import { saga as loansSaga } from '../ducks/loans'

export default function*() {
  yield spawn(loansSaga)
}
