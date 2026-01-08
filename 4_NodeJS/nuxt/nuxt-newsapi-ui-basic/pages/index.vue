<template>
  <div>
    <List :posts="data.articles" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const apiUrl = `https://newsapi.org/v2/top-headlines?country=ca&apiKey=${config.public['newsKey']}`
let { data: data } = await useFetch(apiUrl)
</script>
