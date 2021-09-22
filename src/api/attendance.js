import { post, get } from './http'
import { ADD_ATTENDANCE, VIEW_ATTENDANCE, ATTENDANCE_CHECK_IN } from '../utils/routes'

export const addAttendance = (payload) => post(ADD_ATTENDANCE, payload)

export const viewAttendance = () => get(VIEW_ATTENDANCE)

export const checkIn = date => get(`${ATTENDANCE_CHECK_IN}/${date}`)
