<template>
  <div>
    <List :posts="news.posts[keyword]" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const news = useNewsStore()

const keyword = ref(route.params.keyword)
news.fetchTagNews(config.public['newsKey'], keyword.value)
</script>
