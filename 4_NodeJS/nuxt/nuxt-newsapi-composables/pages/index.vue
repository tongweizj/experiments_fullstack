<template>
  <div>
    <List :posts="news.posts['topnews']" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const news = useNewsStore()
news.fetchTopNews(config.public['newsKey'])
</script>