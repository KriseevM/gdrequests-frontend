<template>
<PageHeader @pageChanged="changePage"/>
<div class="container pt-1 bg-dark h-100 w-sm-75">
  <component :is="this.pages[currentPage]"></component>
  
</div>

</template>

<script>
import PageHeader from './components/Header.vue'
import pages from './pages'


export default {
  name: 'App',
  data() {
    return {
      currentPage: 0,
      pages: pages
    }
  },
  components: {
    PageHeader
  },
  methods: {
    changePage(newPageIndex)
    {
      this.currentPage = newPageIndex;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>