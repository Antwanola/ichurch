import { post, get, put } from './http'
import { SEND_SMS, SENT_SMS, SEND_EMAIL, SENT_EMAILS, RETRIEVE_TEMPLATE, ADD_TEMPLATE, EDIT_TEMPLATE } from '../utils/routes'

export const sendSms = payload => post(SEND_SMS, payload)

export const sendEmail = payload => post(SEND_EMAIL, payload)

export const sentEmails = () => get(SENT_EMAILS)

export const sentSms = () => get(SENT_SMS)

export const getTemp = () => get(RETRIEVE_TEMPLATE)

export const addTemp = payload => post(ADD_TEMPLATE, payload)

export const editTemp = payload => put(EDIT_TEMPLATE, payload)