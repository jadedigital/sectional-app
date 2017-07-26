<template>
  <div class="pane">
    <table class="vu-table">
      <thead>
        <tr>
          <th v-for="head in localColumns" v-on:click="sortBy(head)" v-bind:class="{active: sortkey == head['.key']}" nowrap>{{head['displayname']}}
            <sortarrows v-bind:arrowcolumn="head"></sortarrows>
          </th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in tableFilter">
          <td v-for="head in localColumns">{{item[head[".key"]]}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import db from './db'
import storage from 'electron-json-storage'
import Sortarrows from './Sectiontable/Sortarrows'

export default {
  data () {
    return {
      localSections: {},
      localColumns: {}
    }
  },
  firebase: {
    sections: {
      source: db.ref('Sections'),
      asObject: true
    },
    columns: db.ref('Columns')
  },
  computed: {
    ...mapGetters({
      query: 'queryGet',
      sortkey: 'sortkeyGet',
      sortorders: 'sortOrdersGet',
      searchcolumn: 'searchcolumnget',
      activelist: 'activelistget'
    }),
    tableFilter: function () {
      var list = this.localSections[this.activelist]
      if (this.query) {
        list = this.findBy(list, this.query, this.searchcolumn)
      }
      if (this.sortkey) {
        list = this.orderBy(list, this.sortorders[this.sortkey], this.sortkey)
      }
      return list
    }
  },
  methods: {
    initialOrder: function () {
      this.$store.commit('INITIALIZE', this.localColumns)
    },
    sortBy (column) {
      this.$store.commit('COLUMN_SORT', column['.key'])
    },
    findBy: function (list, value, column) {
      return list.filter(function (item) {
        return String(item[column]).toLowerCase().includes(value.toLowerCase())
      })
    },
    orderBy: function (list, order, column) {
      return list.sort(function (a, b) {
        a = a[column]
        b = b[column]
        return (a === b ? 0 : a > b ? 1 : -1) * order
      })
    },
    loadLocalDB: function () {
      var self = this
      storage.get('section_data', function (error, data) {
        if (error) throw error

        self.localSections = data
      })

      storage.get('column_data', function (error, data) {
        if (error) throw error

        self.localColumns = data
      })
      console.log('Local data loaded')
    },
    loadRemoteDB: function () {
      var sectionsVar = this.sections
      var columnsVar = this.columns
      this.localSections = sectionsVar
      this.localColumns = columnsVar

      storage.set('section_data', sectionsVar, function (error) {
        if (error) throw error
      })
      storage.set('column_data', columnsVar, function (error) {
        if (error) throw error
      })
      console.log('Remote data loaded')
    }
  },
  components: {
    Sortarrows
  },
  mounted: function () {
    this.$nextTick(function () {
      var self = this
      storage.has('section_data', function (error, hasKey) {
        if (error) throw error

        if (hasKey) {
          console.log('Local data available. Loading...')
          self.loadLocalDB()
          setTimeout(self.initialOrder, 2000)
        } else {
          console.log('No data. Loading from server...')
          setTimeout(self.loadRemoteDB, 2000)
          setTimeout(self.initialOrder, 2000)
        }
      })
    })
  }
}
</script>

<style>
th.active {
  background-color: #ECECEC;
}
</style>
