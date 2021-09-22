import { get } from './http'
import { CASH_FLOW, FINANCIALS } from '../utils/routes'

export const cashFlow = () => get(CASH_FLOW)

export const cashFlowDate = payload => get(`${CASH_FLOW}/${payload.start}/${payload.end}`)

export const financials = () => get(FINANCIALS)