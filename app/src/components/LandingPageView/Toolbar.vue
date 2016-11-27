<template>
  <header class="toolbar toolbar-header">  
    <div class="toolbar-actions">
      <div class="btn-group">
        <button class="btn btn-default active">
          <span class="icon icon-home"></span>
        </button>
        <button class="btn btn-default">
          <span class="icon icon-folder"></span>
        </button>
        <button class="btn btn-default">
          <span class="icon icon-cloud"></span>
        </button>
      </div>
      <input type="search" id="search_input" class="form-control" placeholder="Search" :value="query" @input="updateQuery">
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      query: 'queryGet'
    })
  },
  methods: {
    updateQuery (e) {
      this.$store.commit('UPDATE_QUERY', e.target.value)
    }
  }
}
</script>

<style>
.toolbar {
  box-shadow: none;
  background-image: none;
}

#search_input {
    width: 250px;
    border-color: #ccc;
    border-radius: 4px;
    float: right;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-right: 10px;
}

#search_input:focus {
    border-color: #1bc98e;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}


.form-control:focus {
  border-color: #1bc98e;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}

</style>
