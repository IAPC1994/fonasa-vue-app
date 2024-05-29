<template>
  <div class="flex flex-col">
    <top-menu />
    <main class="flex flex-row">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
</script>
