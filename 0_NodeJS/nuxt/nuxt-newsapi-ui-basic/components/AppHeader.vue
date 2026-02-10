<template>
  <nav class="py-4">
    <div class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
      <div class="flex justify-between items-center">
        <div>
          <a class="text-gray-800 font-medium md:text-l" href="/">NewsApi <span class="text-blue-500">Demo</span></a>
        </div>
        <div>
          <button type="button" @click="isOpen = !isOpen"
            class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:-mx-4" :class="isOpen ? 'block' : ['hidden', 'md:block']">
        <a class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0" href="/">Home</a>
        <NuxtLink class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0" to="/tags/nodejs">NodeJs</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { } from 'vue'
</script>

<style scoped></style>
