import { get } from './http'
import { DASHBOARD, RETRIEVE_LOGS } from '../utils/routes'

export const dashboard = () => get(DASHBOARD)

export const getLogs = () => get(RETRIEVE_LOGS)