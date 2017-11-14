<template>
  <div class="pane-sm sidebar">
    <nav id="section_select" class="nav-group">
      <div v-for="(family, key) in sidebar" :key='key'>
        <h5 class="header">{{key}}<span class="expand"></span></h5>
        <span v-for="(item, key) in family" :key='key'><a v-on:click="activatelist(key)" v-bind:class="{active: activelist == key}" class="nav-group-item">{{item['displayname']}}</a></span>
      </div>
    </nav>
    <div class="toolbar-actions">
      <input type="search" v-model="search" id="search_input" class="form-control" placeholder="Search">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      activelist: 'activelistget',
      sidebar: 'sidebar',
      query: 'queryGet'
    }),
    search: {
      get () {
        var query = this.query
        return query
      },
      set (value) {
        this.$store.commit('UPDATE_QUERY', value)
      }
    }
  },
  methods: {
    activatelist (item) {
      this.$store.commit('ACTIVATE_LIST', item)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/settings.scss";

.sidebar {
  position: relative;
}

.pane-sm {
  min-width: 220px;
  background-color: #48525d;
}

.header {
  background: $secondary-color-hover;
  color: $off-white;
  padding-left: 8px;
  margin: 0;
}

.nav-group-item {
  color: $off-white;
  cursor: pointer;
  &.active {
    color: $secondary-color-hover;
  }
  &:hover {
    background-color: #9e9e9e;
  }
}

.btn {
  background-image: none;
  box-shadow: none;
}

.custom-link {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1.6em;
  border: none;
  border-radius: 0;
  background-color: transparent;
  &:hover {
    background-color: #fcfcfc;
  }
}


.toolbar-actions{
  display: flex;
  position: absolute;
  left: 0;
  bottom: 10px;
  margin: 0;
  width: 100%;
  padding: 0
}

#search_input {
  border-radius: 13px;
  margin: 0 8px;
  height: 26px;
  background-color: $secondary-color-hover;
  border-color: $off-white-thin;
  color: $off-white;
  cursor: text;
}

#search_input:focus {
  border-color: $third-color;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}


.form-control:focus {
  border-color: $third-color;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}


.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;

  .tooltip-inner {
    background: #fff;
    padding: 1px 8px;
    border: solid 1px rgba(201, 201, 201, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .tooltip-arrow {
    display: none;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .3s, visibility .3s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s;
  }
}

</style>
