<template>
  <div>
    <List :posts="data.articles" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const keyword = ref(route.params.keyword)

const apiUrl = `https://newsapi.org/v2/everything?sortBy=relevancy&language=zh&q=${keyword.value}&apiKey=${config.public['newsKey']}`
let { data: data } = await useFetch(apiUrl)
</script>
