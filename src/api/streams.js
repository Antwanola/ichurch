import { post, get, put } from './http'
import { VIEW_STREAMS, ADD_STREAMS, EDIT_STREAMS } from '../utils/routes'

export const getStreams = () => get(VIEW_STREAMS)

export const editStream = (payload, id) => put(`${EDIT_STREAMS}/${id}`, payload)

export const addStream = payload => post(ADD_STREAMS, payload)