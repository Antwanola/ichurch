import { get, put, post } from './http'
import { ADD_MEMBER, VIEW_MEMBERS, VIEW_MEMBER, EDIT_MEMBER, DELETE_MEMBER, UNCONFIRMED_MEMBERS, MAKE_ADMIN, MULTIPLE_MEMBER } from '../utils/routes'

export const viewMembers = () => get(VIEW_MEMBERS)

export const viewMember = id => get(`${VIEW_MEMBER}/${id}`)

export const deleteMember = id => post(`${DELETE_MEMBER}/${id}`)

export const editMember = (payload, id) => put(`${EDIT_MEMBER}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const unconfirmedMembers = () => get(UNCONFIRMED_MEMBERS)

export const addMember = payload => post(ADD_MEMBER, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const addMultipleMembers = payload => post(MULTIPLE_MEMBER, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const makeAdmin = id => put(`${MAKE_ADMIN}/${id}`)