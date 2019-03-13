import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { breakpoints } from '../../services/constants'
import Link from '../common/Link'

import FlipMove from 'react-flip-move'
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
import LoanCard from './LoanCard'
import Error from '../common/Error'
import Loader from '../common/Loader'
import Sort from './Sort'

const gapSize = 20
const ListGrid = styled.div`
  /* support IE */
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${gapSize}px -${gapSize}px;

  & > * {
    width: 100%;
    padding: 0 ${gapSize}px ${gapSize}px;

    @media screen and (min-width: ${breakpoints.md}px) {
      width: calc(100% / 2);
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      width: calc(100% / 3);
    }
  }

  /* support modern browser */
  @supports (grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))) and
    (grid-gap: ${gapSize}px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: ${gapSize}px;

    margin: initial;

    & > * {
      width: initial;
      padding: initial;
    }
  }
`

const SortContainer = styled.div`
  margin-bottom: 20px;
`

function LoansList({
  fetchAllLoans,
  error,
  loading,
  loans,
  pollLoansStart,
  pollLoansStop,
  sortLoansBy,
  sortBy
}) {
  useEffect(() => {
    if (!loans.length) fetchAllLoans()
    pollLoansStart()

    return () => {
      pollLoansStop()
    }
  }, [])

  if (error) return <Error />
  if (loading || !loans.length) return <Loader />

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
      <SortContainer>
        <Sort sortLoansBy={sortLoansBy} sortBy={sortBy} sorters={sorters} />
      </SortContainer>
      <ListGrid className="cy-loans-list">
        <FlipMove typeName={null}>
          {loans.map((item) => (
            <Link key={item.id} to={`/zonky/${item.id}`} unstyled>
              <LoanCard key={item.id} {...item} />
            </Link>
          ))}
        </FlipMove>
      </ListGrid>
    </>
  )
}

LoansList.propTypes = {
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
)(LoansList)
