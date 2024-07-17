<template>
  <component :is="as" class="button-top-info b2">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps({
  as: {
    type: [String, Object] as PropType<string | Component>,
    default: "div",
  },
});
</script>

<style lang="scss" scoped>
.button-top-info {
  @apply mx-auto mb-3 flex w-full items-center justify-center text-center text-gray-secondary wrap-balance;
}
</style>
