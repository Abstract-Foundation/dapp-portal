<template>
  <div class="page-title">
    <PageBackButton v-if="fallbackRoute" :fallback="fallbackRoute" />
    <div v-else-if="backFunction" class="back-button">
      <CommonButtonBack @click="backFunction()" />
    </div>

    <h1 class="h1">
      <slot />
    </h1>
  </div>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

defineProps({
  fallbackRoute: {
    type: [String, Object] as PropType<string | RouteLocationRaw>,
  },
  backFunction: {
    type: Function as PropType<() => void>,
  },
});
</script>

<style lang="scss" scoped>
.back-button {
  @apply mt-1;
}
.page-title {
  @apply relative mb-5 flex items-center gap-4;
}
</style>
