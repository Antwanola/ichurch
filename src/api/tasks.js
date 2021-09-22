import { post, get, del, put } from './http'
import { ADD_TASK, GET_TASKS, DELETE_TASK, TASK_COMPLETED_STATE } from '../utils/routes'

export const addTask = payload => post(ADD_TASK, payload)

export const getTasks = () => get(GET_TASKS)

export const deleteTask = id => del(`${DELETE_TASK}/${id}`)

export const updateTaskState = id => put(`${TASK_COMPLETED_STATE}/${id}`)