<template>
  <div class="pane">
    <table class="vu-table">
      <thead>
        <tr>
          <th v-for="head in columns" v-on:click="sortBy(head)" v-bind:class="{active: sortkey == head['.key']}" nowrap>{{head['displayname']}}
            <sortarrows v-bind:arrowcolumn="head"></sortarrows>
          </th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in tableFilter">
          <td v-for="head in columns">{{item[head[".key"]]}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import db from './db'
import Sortarrows from './Sectiontable/Sortarrows'

export default {
  firebase: {
    sections: db.ref('HE'),
    columns: db.ref('Columns')
  },
  computed: {
    ...mapGetters({
      query: 'queryGet',
      sortkey: 'sortkeyGet',
      sortorders: 'sortOrdersGet',
      searchcolumn: 'searchcolumnget'
    }),
    tableFilter: function () {
      var list = this.sections
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
    initialorder: function () {
      this.$store.commit('INITIALIZE', this.columns)
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
    }
  },
  components: {
    Sortarrows
  },
  mounted: function () {
    this.initialorder()
  }
}
</script>

<style>
th.active {
  background-color: #ECECEC;
}
</style>
