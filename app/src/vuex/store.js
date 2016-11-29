import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import { UPDATE_QUERY, COLUMN_SORT, INITIALIZE } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: '',
    sortkey: 'Designation',
    searchcolumn: 'Designation',
    sortOrders: {
      Designation: 1,
      Mass: 1,
      SectionArea: 1
    }
  },
  mutations: {
    [UPDATE_QUERY] (state, queryPayload) {
      state.query = queryPayload
    },
    [COLUMN_SORT] (state, columnPayload) {
      state.sortkey = columnPayload
      state.sortOrders[columnPayload] = state.sortOrders[columnPayload] * -1
    },
    [INITIALIZE] (state, columnsPayload) {
      // var sortOrdersVar = {}
      columnsPayload.forEach(function (key) {
        console.log('placeholder')
        // sortOrdersVar[key['.key']] = 1
        // this isn't getting called possibly because firebase data isn't loaded yet?
        // for now, hardcode column sort numbers
      })
      // state.sortOrders = sortOrdersVar
    }
  },
  actions,
  getters,
  strict: true
})
