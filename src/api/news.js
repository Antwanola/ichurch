import { post, get, put } from './http'
import { ADD_NEWS, VIEW_ALL_NEWS, EDIT_NEWS, DELETE_SERMON } from '../utils/routes'

export const addNews = payload => post(ADD_NEWS, payload)

export const viewAllNews = () => get(VIEW_ALL_NEWS)

export const editNews = (payload, id) => put(`${EDIT_NEWS}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const deleteNews = id => post(`${DELETE_SERMON}/${id}`)