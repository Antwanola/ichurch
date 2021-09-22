import { get, put, post } from './http'
import { ADD_FIRST_TIMER, VIEW_FIRST_TIMER, EDIT_FIRST_TIMER, SINGLE_FIRST_TIMER } from '../utils/routes'

export const viewFirstTimers = () => get(VIEW_FIRST_TIMER)

export const deleteFirstTimer = () => post()

export const editFirstTimer = (payload, id) => put(`${EDIT_FIRST_TIMER}/${id}`, payload)

export const addFirstTimer = payload => post(ADD_FIRST_TIMER, payload)

export const getSingleFirstTimer = id => get(`${SINGLE_FIRST_TIMER}/${id}`)
