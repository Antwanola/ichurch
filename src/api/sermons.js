import { get, post, put } from './http'
import { VIEW_SERMON, VIEW_SINGLE_SERMON, ADD_SERMON, EDIT_SERMON, DELETE_SERMON } from '../utils/routes'

export const getSermons = () => get(VIEW_SERMON)

export const getSingleSermon = id => get(`${VIEW_SINGLE_SERMON}/${id}`)

export const addSermon = payload => post(ADD_SERMON, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const editSermon = (payload, id) => put(`${EDIT_SERMON}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const deleteSermon = id => post(`${DELETE_SERMON}/${id}`)