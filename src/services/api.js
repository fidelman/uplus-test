import axios from 'axios'
import { fetchLoansURL, fetchLoanURL } from '../config'

class ApiService {
  a = axios

  fetchLoans = () => this.a.get(fetchLoansURL).then((res) => res.data)
  fetchLoanById = (loanId) =>
    this.a.get(`${fetchLoanURL}/${loanId}`).then((res) => res.data)
}

export default new ApiService()
