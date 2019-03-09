import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import {
  fetchAllLoans,
  isLoadingSelector,
  isErrorSelector,
  isLoadedSelector,
  getLoansSelector
} from '../../ducks/loans'
import LoanCard from './LoanCard'
import Error from '../common/Error'
import Loader from '../common/Loader'
import Sort from './Sort'

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`

const SortContainer = styled.div`
  margin-bottom: 20px;
`

function LoansList({ fetchAllLoans, error, loading, loans, loaded }) {
  useEffect(() => {
    if (!loaded) fetchAllLoans()
  }, [])

  if (error) return <Error />
  if (loading || !loaded) return <Loader />

  return (
    <>
      <SortContainer>
        <Sort />
      </SortContainer>
      <ListGrid>
        <FlipMove typeName={null}>
          {loans.map((item) => (
            <LoanCard {...item} key={item.id} />
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
  { fetchAllLoans }
)(LoansList)
