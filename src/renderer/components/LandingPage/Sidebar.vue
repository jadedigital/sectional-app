<template>
  <div class="pane-sm sidebar">
    <nav id="section_select" class="nav-group">
      <div v-for="(family, key) in sidebar" :key='key'>
        <h5 class="nav-group-title">{{key}}<span class="expand"></span></h5>
        <span v-for="(item, key) in family" :key='key'><a v-on:click="activatelist(key)" v-bind:class="{active: activelist == key}" class="nav-group-item">{{item['displayname']}}</a></span>
      </div>
    </nav>
    <router-link class="btn btn-default custom-link" to="/custom" v-tooltip="'Build Custom Section'">
      <span class="fa fa-crop"></span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      activelist: 'activelistget',
      sidebar: 'sidebar'
    })
  },
  methods: {
    activatelist (item) {
      this.$store.commit('ACTIVATE_LIST', item)
    }
  }
}
</script>

<style lang="scss">
.nav-group-item:hover {
  color: #fff;
  background-color: #9e9e9e;
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

.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;

  .tooltip-inner {
    background: #fff;
    padding: 1px 8px;
    border: solid 1px #9e9e9e;
    box-shadow: 1px 1px 3px #ccc;
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
