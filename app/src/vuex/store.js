import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { UPDATE_QUERY } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: 'Test'
  },
  mutations: {
    [UPDATE_QUERY] (state, queryPayload) {
      state.query = queryPayload
    }
  },
  actions,
  getters,
  strict: true
})
