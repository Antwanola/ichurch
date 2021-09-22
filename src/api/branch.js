import { get, put, post } from './http'
import { ADD_BRANCH, VIEW_BRANCHES, VIEW_BRANCH, EDIT_BRANCH, DELETE_BRANCH } from '../utils/routes'

export const viewBranches = () => get(VIEW_BRANCHES)

export const getBranch = id => get(`${VIEW_BRANCH}/${id}`)

export const deleteBranch = id => post(`${DELETE_BRANCH}/${id}`)

export const editBranch = (payload, id) => put(`${EDIT_BRANCH}/${id}`, payload)

export const addBranch = payload => post(ADD_BRANCH, payload)