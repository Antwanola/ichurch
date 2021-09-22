import { get, put, post } from './http'
import { ADD_STAFF, ALL_STAFF, VIEW_STAFF, EDIT_STAFF, DELETE_STAFF } from '../utils/routes'

export const allStaff = () => get(ALL_STAFF)

export const viewStaff = id => get(`${VIEW_STAFF}/${id}`)

export const deleteStaff = id => post(`${DELETE_STAFF}/${id}`)

export const editStaff = (payload, id) => put(`${EDIT_STAFF}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const addStaff = payload => post(ADD_STAFF, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})