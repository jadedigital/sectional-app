<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div class="window">
    <div class="window-content">
      <div class="pane-group">
        <sidebar></sidebar>
        <sectiontable></sectiontable>
      </div>
    </div>
    <footbar></footbar>
  </div>
</template>

<script>
  import Toolbar from './LandingPage/Toolbar'
  import Sidebar from './LandingPage/Sidebar'
  import Sectiontable from './LandingPage/Sectiontable'
  import Footbar from './LandingPage/Footbar'

  export default {
    methods: {
      keydowns (e) {
        if (e.keyCode === 70 && e.ctrlKey) {
          document.getElementById('search_input').focus()
        }
      }
    },
    created: function () {
      window.addEventListener('keydown', this.keydowns)
    },
    destroyed: function () {
      window.removeEventListener('keydown', this.keydowns)
    },
    components: {
      Toolbar,
      Sidebar,
      Sectiontable,
      Footbar
    },
    name: 'landing-page'
  }

</script>
