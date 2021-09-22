/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios'
import {
  login
} from '../api/auth'

const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({
    commit
  }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({
    commit
  }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({
    commit
  }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({
    commit
  }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({
    commit
  }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  // API CALLS
  async loginUser({
    commit
  }, payload) {
    try {
      const {
        data
      } = await login(payload)
      commit('SET_TOKEN', data.token)
      commit('UPDATE_USER_INFO', {
        name: data.name,
        photo: data.photo,
        uid: data.id
      })
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    } catch (error) {
      const result = error.response ? error.response.data.message : error.message
      return {
        error: result
      }
    }
  },
  logout({
    commit
  }) {
    commit('SET_TOKEN', null)
  }
}

export default actions
