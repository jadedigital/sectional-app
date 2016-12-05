<template>
  <div class="pane-sm sidebar">
    <nav id="section_select" class="nav-group">
      <div v-for="family in sidebar">
        <h5 class="nav-group-title">{{family['.key']}}<span class="expand"></span></h5>
        <span v-for="(item, key) in family"><a v-on:click="activatelist(key)" v-bind:class="{active: activelist == key}" class="nav-group-item">{{item['displayname']}}</a></span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import db from './db'

export default {
  firebase: {
    sidebar: db.ref('Sidebar')
  },
  computed: {
    ...mapGetters({
      activelist: 'activelistget'
    })
  },
  methods: {
    activatelist (item) {
      console.log(JSON.stringify(this.sidebar))
      this.$store.commit('ACTIVATE_LIST', item)
    }
  }
}
</script>
