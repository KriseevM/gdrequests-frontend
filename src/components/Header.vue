<template>
<nav class="navbar navbar-expand-lg bg-light border-bottom">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="logo.svg"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-for="(page, index) in pages" v-bind:key="index">
          <a class="nav-link" :class="{ active: currentPage === index }" aria-current="page" :act="page.name" href="#" @click="currentPage = index">{{page.display}}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
import pages from './../pages'
let pageData = pages.map((page) => { return { name: page.name, display: page.data().displayName, index: page.data().index }; })
export default ({
    name: 'PageHeader',
    data()
    {
        return {
            pages: pageData,
            currentPage: 0
        }
    },
    watch:{
        currentPage(newPageIndex) {
            this.$emit('pageChanged', newPageIndex)
        } 
    },
    emits: [
        'pageChanged'
    ]
})
</script>