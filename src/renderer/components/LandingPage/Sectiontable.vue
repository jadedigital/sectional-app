<template>
  <div class="pane">
    <table class="vu-table" v-if="columns[1]">
      <thead>
        <tr>
          <th v-for="(head, index) in columns" :key='index' v-on:click="sortBy(head)" v-bind:class="{active: sortkey == head}" nowrap>{{head}}
            <sortarrows v-bind:arrowcolumn="head"></sortarrows>
          </th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in tableFilter" :key="item.designation">
          <td v-for="(head, index) in columns" :key='index'>{{item[head]}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import Sortarrows from './Sectiontable/Sortarrows'

export default {
  computed: {
    ...mapGetters({
      query: 'queryGet',
      sortkey: 'sortkeyGet',
      sortorders: 'sortOrdersGet',
      searchcolumn: 'searchcolumnget',
      activelist: 'activelistget',
      sections: 'sections',
      columns: 'columns'
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
    initialOrder: function () {
      this.$store.commit('INITIALIZE', this.columns)
    },
    sortBy (column) {
      this.$store.commit('COLUMN_SORT', column)
    },
    findBy: function (list, value, column) {
      return list.filter(function (item) {
        return String(item[column]).toLowerCase().includes(value.toLowerCase())
      })
    },
    orderBy: function (list, order, column) {
      return list.slice(0).sort(function (a, b) {
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
    this.$nextTick(function () {
      var self = this
      self.initialOrder()
    })
  }
}
</script>

<style>
th.active {
  background-color: #ECECEC;
}

.vu-row:hover {
  color: #fff;
  background-color: #9e9e9e;
}

</style>
