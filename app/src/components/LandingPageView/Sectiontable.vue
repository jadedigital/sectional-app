<template>
  <div class="pane">
    <table class="vu-table">
      <thead>
        <tr>
          <th v-for="head in columns" nowrap>{{head[".value"]}}</th>
        </tr>
      </thead>
      <tbody class="vu-body">
        <tr class="vu-row" v-for="item in findBy(sections, query, 'Designation')">
          <td v-for="head in columns">{{item[head[".value"]]}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import db from './db'
import findBy from './filters.js'

export default {
  firebase: {
    sections: db.ref('HE'),
    columns: db.ref('Columns')
  },
  computed: {
    ...mapGetters({
      query: 'queryGet'
    })
  },
  methods: {
    findBy
  }
}
</script>
