import {
  get,
  put,
  post
} from './http'
import {
  ADD_EVENT,
  VIEW_EVENTS,
  EDIT_EVENT,
} from '../utils/routes'

export const viewEvents = () => get(VIEW_EVENTS)

// export const deleteMember = id => post(`${DELETE_MEMBER}/${id}`);

export const editEvent = (payload, id) => put(`${EDIT_EVENT}/${id}`, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const addEvent = payload => post(ADD_EVENT, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})
