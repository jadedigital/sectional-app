<template>
  <div class="pane sections">
    <table class="vu-table">
      <thead>
        <tr>
          <th v-for="(head, key) in columns" :key='key' v-on:click="sortBy(key)" v-bind:class="{active: sortkey == key}" v-tooltip="head.displayname" nowrap>
            <span v-html="head.symbol"></span>
            <span class="units" v-show="head.unit" v-html="units[key]"></span>
            <sortarrows v-bind:arrowcolumn="key"></sortarrows>
          </th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in tableFilter" :key="item.designation">
          <td v-for="(head, key) in columns" :key='key'>{{item[key] | exponent}}</td>
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
    },
    units: function () {
      var units = {}
      for (var key in this.columns) {
        units[key] = '(' + this.columns[key].unit + ')'
      }
      return units
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    exponent: function (value) {
      if (isNaN(value) || value < 10000) {
        return value
      } else {
        return value.toExponential(2)
      }
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

<style lang="scss">
@import "../../styles/settings.scss";

.vu-table {
  th {
    color: $off-white;
    background-color: $secondary-color-hover;
    border: 0;
    cursor: pointer;
    .units {
      font-size: 10px;
    }
    span {
      cursor: pointer;
    }
  }
  th.active {
    background-color: $secondary-color;
  }
  th:nth-child(n+2), td:nth-child(n+2) {
    text-align: center;
  }
}


.vu-row:hover {
  color: $off-white;
  background-color: $secondary-color;
}

.sections {
  border-left: 0;
}

</style>
