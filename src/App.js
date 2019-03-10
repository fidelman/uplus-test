import React from 'react'
import { Route } from 'react-router-dom'
import LoansListPage from './components/routes/LoansListPage'
import LoanDetailPage from './components/routes/LoanDetailPage'
import Header from './components/common/Header'
import styled from 'styled-components'

const Layout = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`

function App() {
  return (
    <Layout>
      <Header />
      <Route path="/" exact component={LoansListPage} />
      <Route path="/:loanId" exact component={LoanDetailPage} />
    </Layout>
  )
}

export default App
