import { get, post } from './http'
import { ADD_PAYROLL, VIEW_PAYROLL } from '../utils/routes'

export const viewPayroll = () => get(`${VIEW_PAYROLL}`)

export const addPayroll = payload => post(ADD_PAYROLL, payload)