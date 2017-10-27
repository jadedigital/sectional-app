<template>
  <header class="toolbar toolbar-header">  
    <div class="toolbar-actions">
      <div class="btn-group">
        <router-link class="btn btn-default active" to="/" v-tooltip="'Database'">
          <span class="fa fa-database"></span>
        </router-link>
        <router-link class="btn btn-default" to="/custom" v-tooltip="'Build Custom Section'">
          <span class="fa fa-object-group"></span>
        </router-link>
        <button class="btn btn-default" v-on:click="clearData" v-tooltip="'Refresh Section Data'">
          <span class="icon icon-cloud"></span>
        </button>
      </div>
      <input type="search" id="search_input" class="form-control" placeholder="Search" :value="query" @input="updateQuery">
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import storage from 'electron-json-storage'

export default {
  computed: {
    ...mapGetters({
      query: 'queryGet'
    })
  },
  methods: {
    updateQuery (e) {
      this.$store.commit('UPDATE_QUERY', e.target.value)
    },
    clearData () {
      storage.clear(function (error) {
        if (error) throw error
        console.log('Data cleared')
      })
    }
  }
}
</script>

<style lang="scss">
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

.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;

  .tooltip-inner {
    background: #6b6b6b;
    color: white;
    border-radius: 10px;
    padding: 2px 10px;
  }

  .tooltip-arrow {
    display: none;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

</style>
