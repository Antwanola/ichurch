import { get } from './http'
import { DOWNLOAD_FIRST_TIMERS, DOWNLOAD_PAYROLL, DOWNLOAD_ALL_MEMBERS } from '../utils/routes'

export const downloadFirstTimers = () => get(DOWNLOAD_FIRST_TIMERS)

export const downloadPayroll = () => get(DOWNLOAD_PAYROLL)

export const downloadMembers = () => get(DOWNLOAD_ALL_MEMBERS)
