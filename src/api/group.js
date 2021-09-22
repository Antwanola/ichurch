import { get, put, post } from './http'
import { VIEW_GROUPS, EDIT_GROUP, CREATE_GROUP } from '../utils/routes'

export const viewGroups = () => get(VIEW_GROUPS)

export const editGroup = (payload, id) => put(`${EDIT_GROUP}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const createGroup = payload => post(CREATE_GROUP, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})