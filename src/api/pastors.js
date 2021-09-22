import { post, get, put } from './http'
import { ADD_PASTOR, VIEW_PASTORS, VIEW_PASTOR, EDIT_PASTOR, DELETE_PASTOR } from '../utils/routes'

export const addPastor = payload => post(ADD_PASTOR, payload)

export const viewPastors = () => get(VIEW_PASTORS)

export const getPastor = id => get(`${VIEW_PASTOR}/${id}`)

export const editPastor = (payload, id) => put(`${EDIT_PASTOR}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const deletePastor = id => post(`${DELETE_PASTOR}/${id}`)