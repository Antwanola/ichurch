import { post, put } from './http'
import { LOGIN, CREATE_PASSWORD, CHANGE_PASSWORD, FORGOT_PASSWORD, LOGOUT } from '../utils/routes'

export const login = (payload) => post(LOGIN, payload)

export const createPassword = id => post(`${CREATE_PASSWORD}/${id}`)

export const changePassword = payload => put(CHANGE_PASSWORD, payload)

export const forgotPassword = payload => post(FORGOT_PASSWORD, payload)

export const logout = () => post(LOGOUT)