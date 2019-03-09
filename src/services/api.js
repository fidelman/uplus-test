import axios from 'axios'
import { fetchLoansURL as baseURL } from '../config'

class ApiService {
  a = axios.create({ baseURL })

  fetchLoans = () => this.a()
}

export default new ApiService()
