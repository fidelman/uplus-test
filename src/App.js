import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import NotFoundPage from './components/common/404'
import LoansListPage from './components/routes/LoansListPage'
import LoanDetailPage from './components/routes/LoanDetailPage'
import Header from './components/common/Header'

const Layout = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route path="/" exact component={LoansListPage} />
        <Route path="/zonky/:loanId" exact component={LoanDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  )
}

export default App
