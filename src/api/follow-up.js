import {
  get,
  post
} from './http'
import {
  ADD_FOLLOW_UP,
  VIEW_FOLLOW_UPS,
  ADD_FOLLOWUP_CATEGORY,
  GET_CATEGORIES,
  ALL_FOLLOW_UPS,
  MY_FOLLOW_UPS,
  FOLLOWUP_CATEGORIES
} from '../utils/routes'

export const viewFollowUps = () => get(VIEW_FOLLOW_UPS)

export const getFollowUpsCategories = () => get(GET_CATEGORIES)

export const addFollowUp = payload => post(ADD_FOLLOW_UP, payload)

export const addCategory = payload => post(ADD_FOLLOWUP_CATEGORY, payload)

export const allFollowUps = () => get(ALL_FOLLOW_UPS)

export const myFollowups = () => get(MY_FOLLOW_UPS)

export const followupCategories = () => get(FOLLOWUP_CATEGORIES)
