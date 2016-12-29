import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { UPDATE_QUERY, COLUMN_SORT, INITIALIZE, ACTIVATE_LIST } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: '',
    activelist: 'HE',
    sortkey: 'Designation',
    searchcolumn: 'Designation',
    sortOrders: {}
  },
  mutations: {
    [UPDATE_QUERY] (state, queryPayload) {
      state.query = queryPayload
    },
    [COLUMN_SORT] (state, columnPayload) {
      state.sortkey = columnPayload
      state.sortOrders[columnPayload] = state.sortOrders[columnPayload] * -1
    },
    [ACTIVATE_LIST] (state, listPayload) {
      state.activelist = listPayload
    },
    [INITIALIZE] (state, columnsPayload) {
      var sortOrdersVar = {}
      columnsPayload.forEach(function (key) {
        sortOrdersVar[key['.key']] = 1
      })
      state.sortOrders = sortOrdersVar
    }
  },
  actions,
  getters,
  strict: true
})
