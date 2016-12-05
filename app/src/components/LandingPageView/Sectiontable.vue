<template>
  <div class="pane">
    <table class="vu-table">
      <thead>
        <tr>
          <th v-for="(head, key) in columns" v-on:click="sortBy(key)" v-bind:class="{active: sortkey == key}" nowrap>{{head['displayname']}}
            <sortarrows v-bind:arrowcolumn="key"></sortarrows>
          </th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in tableFilter">
          <td v-for="(head, key) in columns">{{item[key]}}</td>
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
    sections: {
      source: db.ref('Sections'),
      asObject: true
    },
    columns: {
      source: db.ref('Columns'),
      asObject: true
    }
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
      var list = this.sections[this.activelist]
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
      console.log(JSON.stringify(this.columns))
      this.$store.commit('COLUMN_SORT', column)
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
