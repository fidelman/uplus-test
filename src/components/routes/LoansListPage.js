import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import LoansList from '../loans/LoansList'

export const Layout = styled.div`
  margin: auto;
  max-width: ${(props) => props.theme.maxContainerWidth};
`

function LoansListPage() {
  return (
    <Layout>
      <Typography component="h1" variant="h3" gutterBottom>
        Loans List
      </Typography>
      <LoansList />
    </Layout>
  )
}

export default LoansListPage
