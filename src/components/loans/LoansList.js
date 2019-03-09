import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`

function LoansList({ fetchAllLoans, error, loading, loans, loaded }) {
  useEffect(() => {
    fetchAllLoans()
  }, [])

  if (error) return <Error />
  if (loading || !loaded) return <Loader />

  return (
    <Layout>
      {loans.map((item) => (
        <LoanCard {...item} key={item.id} />
      ))}
    </Layout>
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
