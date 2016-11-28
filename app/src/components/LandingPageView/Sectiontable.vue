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
        <tr class="vu-row" v-for="item in findBy(sections, query, 'Designation')">
          <td v-for="head in columns">{{item[head[".key"]]}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import db from './db'
import findBy from './filters.js'
import Sortarrows from './Sectiontable/Sortarrows'

export default {
  firebase: {
    sections: db.ref('HE'),
    columns: db.ref('Columns')
  },
  computed: {
    ...mapGetters({
      query: 'queryGet',
      sortkey: 'sortkeyGet'
    })
  },
  methods: {
    findBy,
    initialorder: function () {
      this.$store.commit('INITIALIZE', this.columns)
    },
    sortBy (column) {
      this.$store.commit('COLUMN_SORT', column['.key'])
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
