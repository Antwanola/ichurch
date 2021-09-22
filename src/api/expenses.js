import { get, post, put } from './http'
import { VIEW_EXPENSE, EXPENSE_CATEGORIES, DEL_EXPENSE_CATEGORY, ADD_EXPENSE_CATEGORY, ADD_EXPENSE, EDIT_EXPENSE_CATEGORY } from '../utils/routes'

export const allCategories = payload => get(EXPENSE_CATEGORIES, payload)

export const addCategory = payload => post(ADD_EXPENSE_CATEGORY, payload)

export const editCategory = (payload, id) => put(`${EDIT_EXPENSE_CATEGORY}/${id}`, payload)

export const delCategory = id => post(`${DEL_EXPENSE_CATEGORY}/${id}`)

export const addExpense = payload => post(ADD_EXPENSE, payload, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export const allExpenses = () => get(VIEW_EXPENSE)