import { get, post, put } from './http'
import { VIEW_INCOME, INCOME_CATEGORIES, DEL_INCOME_CATEGORY, ADD_INCOME_CATEGORY, ADD_INCOME, EDIT_INCOME_CATEGORY } from '../utils/routes'

export const allCategories = payload => get(INCOME_CATEGORIES, payload)

export const addCategory = payload => post(ADD_INCOME_CATEGORY, payload)

export const editCategory = (payload, id) => put(`${EDIT_INCOME_CATEGORY}/${id}`, payload)

export const delCategory = id => post(`${DEL_INCOME_CATEGORY}/${id}`)

export const addIncome = payload => post(ADD_INCOME, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const allIncomes = () => get(VIEW_INCOME)