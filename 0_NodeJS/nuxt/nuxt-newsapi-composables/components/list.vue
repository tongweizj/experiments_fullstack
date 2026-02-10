<template>
  <div>
    <section class="mt-1 flex">
      <div class="relative mx-auto w-full">
        <section class="mt-1">
          <a v-for="(article, index) in posts" :key="index"
            class="inline-flex w-full items-baseline rounded py-4 visited:text-slate-400 hover:bg-slate-100"
            :href="article.url" target="_blank" rel="noreferrer noopener">
            <span class="mr-2 float-left flex w-6 flex-none justify-end text-xs text-slate-400 dark:text-gray-500">{{
              index + 1 }}.</span>
            <div class="pr-2">
              <span class="block">{{ article.title }}</span>
              <span class="text-sm text-gray-400 block">{{ article.description }}</span>
            </div>
          </a>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: ['posts'],
  data() {
    return {}
  },
  created() { },
  mounted() {
    // this.load()
  },
})
</script>

<style scoped></style>
