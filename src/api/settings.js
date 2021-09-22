import { get, post, put } from './http'
import { RETRIEVE_KEYS, SAVE_KEYS, EDIT_KEYS, SEND_NOTIFICATION, DEFAULT_IMAGES } from '../utils/routes'

export const retrieveKeys = () => get(RETRIEVE_KEYS)

export const addKeys = payload => post(SAVE_KEYS, payload)

export const editKeys = payload => put(EDIT_KEYS, payload)

export const uploadDefaultImages = payload => put(DEFAULT_IMAGES, payload, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const sendNotification = () => post(SEND_NOTIFICATION)