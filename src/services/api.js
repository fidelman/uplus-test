import axios from 'axios'
import { fetchLoansURL as baseURL } from '../config'

class ApiService {
  a = axios.create({
    baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  fetchLoans = () => this.a().then((res) => res.data)
}

export default new ApiService()
