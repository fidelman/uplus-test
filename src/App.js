import React from 'react'
import { Route } from 'react-router-dom'
import LoansListPage from './components/routes/LoansListPage'

function App() {
  return (
    <>
      <Route path="/" exact component={LoansListPage} />
    </>
  )
}

export default App
