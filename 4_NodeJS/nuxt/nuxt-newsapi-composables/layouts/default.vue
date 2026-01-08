<template>
  <div id="app" class="font-roboto">
    <AppHeader />

    <div class="flex justify-between container mx-auto">
      <div class="w-full">
        <slot />
      </div>
    </div>

    <AppFooter />
  </div>
</template>
