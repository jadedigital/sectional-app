import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { UPDATE_QUERY, COLUMN_SORT, INITIALIZE, ACTIVATE_LIST, UPDATE_COORD } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: '',
    activelist: 'HE',
    sortkey: 'Designation',
    searchcolumn: 'Designation',
    sortOrders: {},
    sectionCoords: {}
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
    },
    [UPDATE_COORD] (state, coordPayload) {
      // console.log(state.sectionCoords[coordPayload.index].x)
      state.sectionCoords[coordPayload.index][coordPayload.axis] = Number(coordPayload.value)
    }
  },
  actions,
  getters,
  strict: true
})
