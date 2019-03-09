import React from 'react'
import { Route } from 'react-router-dom'
import LoansListPage from './components/routes/LoansListPage'
import LoanDetailPage from './components/routes/LoanDetailPage'

function App() {
  return (
    <>
      <Route path="/" exact component={LoansListPage} />
      <Route path="/:loanId" exact component={LoanDetailPage} />
    </>
  )
}

export default App
