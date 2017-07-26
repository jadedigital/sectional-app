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
    sectionCoords: {
      1: {x: 0, y: 260},
      2: {x: 10, y: 260},
      3: {x: 10, y: 300},
      4: {x: 95, y: 300},
      5: {x: 95, y: 0},
      6: {x: 105, y: 0},
      7: {x: 105, y: 300},
      8: {x: 190, y: 300},
      9: {x: 190, y: 260},
      10: {x: 200, y: 260},
      11: {x: 200, y: 320},
      12: {x: 0, y: 320}
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
