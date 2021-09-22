import { get, put, post } from './http'
import { ADD_DEVOTIONAL, VIEW_DEVOTIONALS, VIEW_DEVOTIONAL, EDIT_DEVOTIONAL, DELETE_DEVOTIONAL } from '../utils/routes'

export const viewDevotionals = () => get(VIEW_DEVOTIONALS)

export const getDevotional = id => get(`${VIEW_DEVOTIONAL}/${id}`)

export const deleteDevotional = id => post(`${DELETE_DEVOTIONAL}/${id}`)

export const editDevotional = (payload, id) => put(`${EDIT_DEVOTIONAL}/${id}`, payload)

export const addDevotional = payload => post(ADD_DEVOTIONAL, payload)