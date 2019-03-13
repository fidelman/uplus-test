import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoanDetail from '../loans/LoanDetail'
import NotFoundPage from '../common/404'

import {
  fetchLoanById,
  getLoanSelector,
  isErrorSelector,
  isLoadingSelector,
  getLoansSelector
} from '../../ducks/loans'
import Loader from '../common/Loader'

function LoanDetailPage({ loan, fetchLoanById, match, loading, error, loans }) {
  const { loanId } = match.params
  const loanDetail =
    loan || loans.find((loan) => loan.id.toString() === loanId.toString())

  useEffect(() => {
    if (loanDetail) return
    fetchLoanById(match.params.loanId)
  }, [])

  if (error) return <NotFoundPage />

  if (!loanDetail || loading) return <Loader />

  return <LoanDetail loan={loanDetail} />
}

LoanDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      loanId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  fetchLoanById: PropTypes.func.isRequired,
  loan: PropTypes.object
}

export default withRouter(
  connect(
    (state) => ({
      loans: getLoansSelector(state),
      loan: getLoanSelector(state),
      loading: isLoadingSelector(state),
      error: isErrorSelector(state)
    }),
    { fetchLoanById }
  )(LoanDetailPage)
)
