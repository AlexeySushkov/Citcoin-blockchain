import axios from 'axios'
import config from '@/config'

export default {
  blockchain_init () {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('hiperledgerDemo/v1/init')
  },
  blockchain_account (params) {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('hiperledgerDemo/v1/account', { params: params })
  },  
  blockchain_transaction (params) {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('hiperledgerDemo/v1/transaction', { params: params })
  },
  blockchain_info (params) {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('hiperledgerDemo/v1/info', { params: params })
  },
  blockchain_events () {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('hiperledgerDemo/v1/events')
  }
}
