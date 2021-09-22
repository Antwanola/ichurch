import { get, post } from './http'
import { ALL_TYPES, ADD_TYPE, DEL_TYPE, ADD_CONTRIBUTION, ALL_CONTRIBUTIONS } from '../utils/routes'

export const allTypes = () => get(ALL_TYPES)

export const addType = payload => post(ADD_TYPE, payload)

export const delType = id => post(`${DEL_TYPE}/${id}`)

export const addContribution = payload => post(ADD_CONTRIBUTION, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const allContributions = () => get(ALL_CONTRIBUTIONS)