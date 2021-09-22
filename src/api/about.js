import { get, put, post } from './http'
import { VIEW_ABOUT, EDIT_ABOUT, ADD_INFO } from '../utils/routes'

export const viewAbout = () => get(VIEW_ABOUT)

export const editAbout = (payload, id) => put(`${EDIT_ABOUT}/${id}`, payload)

export const addAbout = payload => post(ADD_INFO, payload)