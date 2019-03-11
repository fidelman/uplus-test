import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Link from '../common/Link'

import FlipMove from 'react-flip-move'
import {
  fetchAllLoans,
  isLoadingSelector,
  isErrorSelector,
  isLoadedSelector,
  getLoansSelector,
  pollLoansStart,
  pollLoansStop
} from '../../ducks/loans'
import LoanCard from './LoanCard'
import Error from '../common/Error'
import Loader from '../common/Loader'
import Sort from './Sort'

const ListGrid = styled.div`
  display: grid;
  /* see /public/index.html line 24 */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`

const SortContainer = styled.div`
  margin-bottom: 20px;
`

function LoansList({
  fetchAllLoans,
  error,
  loading,
  loans,
  loaded,
  pollLoansStart,
  pollLoansStop
}) {
  useEffect(() => {
    if (!loaded) fetchAllLoans()
    pollLoansStart()

    return () => {
      pollLoansStop()
    }
  }, [])

  if (error) return <Error />
  if (loading || !loaded) return <Loader />

  return (
    <>
      <SortContainer>
        <Sort />
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
    loaded: isLoadedSelector(state),
    loans: getLoansSelector(state)
  }),
  { fetchAllLoans, pollLoansStart, pollLoansStop }
)(LoansList)
