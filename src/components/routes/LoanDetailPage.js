import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoanDetail from '../loans/LoanDetail'
import { Layout } from './LoansListPage'
import {
  fetchLoanById,
  getLoanSelector,
  isErrorSelector,
  isLoadingSelector,
  getLoansSelector
} from '../../ducks/loans'
import Loader from '../common/Loader'
import Error from '../common/Error'

function LoanDetailPage({ loan, fetchLoanById, match, loading, error, loans }) {
  const { loanId } = match.params
  const loanDetail =
    loan || loans.find((loan) => loan.id.toString() === loanId.toString())

  useEffect(() => {
    if (loanDetail) return
    fetchLoanById(match.params.loanId)
  }, [])

  let content = null

  if (!loanDetail || loading) {
    content = <Loader />
  } else if (error) {
    content = <Error />
  } else {
    content = <LoanDetail loan={loanDetail} />
  }

  return <Layout>{content}</Layout>
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
