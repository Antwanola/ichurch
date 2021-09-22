import axios from 'axios'
import store from '../store/store'
import router from '../router'

axios.interceptors.response.use(response => {
  return response
},
  (error) => {
    if (error && error.response) {
      if (error.response.data.statusCode === 403 || error.response.data.statusCode === 401) {
        store.dispatch('logout')
        router.push(`/login?redirect=${router.currentRoute.fullPath}`).catch(() => {})
      }
    }
    return Promise.reject(error)
  })

export const get = resource => axios.get(resource)

export const post = (resource, params) => axios.post(resource, params)

export const patch = (resource, params) => axios.patch(resource, params)

export const put = (resource, params) => axios.put(resource, params)

export const del = resource => axios.delete(resource)
