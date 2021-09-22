import { get, post } from './http'
import { ADD_FAMILY_TREE, GET_LASTNAMES, RETRIEVE_NAMES, ALL_FAMILY_TREES } from '../utils/routes'

export const getLastNames = () => get(GET_LASTNAMES)

export const retrieveNames = name => get(`${RETRIEVE_NAMES}/${name}`)

export const addFamilyTree = payload => post(ADD_FAMILY_TREE, payload)

export const allFamilyTrees = () => get(ALL_FAMILY_TREES)