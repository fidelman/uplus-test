import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LoansList from '../loans/LoansList'
import Error from '../common/Error'
import Loader from '../common/Loader'
import Sort from '../loans/Sort'

import {
  fetchAllLoans,
  isLoadingSelector,
  isErrorSelector,
  getLoansSelector,
  pollLoansStart,
  pollLoansStop,
  sortLoansBySelector,
  sortLoansBy
} from '../../ducks/loans'

const SortContainer = styled.div`
  margin-bottom: 20px;
`

function LoansListPage({
  fetchAllLoans,
  error,
  loading,
  pollLoansStart,
  pollLoansStop,
  sortLoansBy,
  sortBy,
  loans
}) {
  let loansList = null

  useEffect(() => {
    if (!loans.length) fetchAllLoans()
    pollLoansStart()

    return () => {
      pollLoansStop()
    }
  }, [])

  if (error) loansList = <Error />
  if (loading || !loans.length) loansList = <Loader />

  loansList = <LoansList loans={loans} />

  const sorters = [
    'duration-ASC',
    'duration-DESC',
    'rating-ASC',
    'rating-DESC',
    'amount-ASC',
    'amount-DESC',
    'deadline-ASC',
    'deadline-DESC'
  ]

  return (
    <>
      <Typography component="h1" variant="h3" gutterBottom>
        Loans List
      </Typography>
      <SortContainer>
        <Sort sortLoansBy={sortLoansBy} sortBy={sortBy} sorters={sorters} />
      </SortContainer>
      {loansList}
    </>
  )
}

LoansListPage.propTypes = {
  fetchAllLoans: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loans: PropTypes.array.isRequired
}

export default connect(
  (state) => ({
    error: isErrorSelector(state),
    loading: isLoadingSelector(state),
    loans: getLoansSelector(state),
    sortBy: sortLoansBySelector(state)
  }),
  { fetchAllLoans, pollLoansStart, pollLoansStop, sortLoansBy }
)(LoansListPage)
