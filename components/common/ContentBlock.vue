<template>
  <component :is="as" class="content-block-container" :class="`variant-${variant}`">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps({
  as: {
    type: [String, Object] as PropType<string | Component>,
    default: "div",
  },
  variant: {
    type: String as PropType<"default" | "unpadded">,
    default: "default",
  },
});
</script>

<style lang="scss" scoped>
.content-block-container {
  @apply block h-max w-full rounded-3xl bg-white px-6 pb-8 pt-6;

  &.variant-unpadded {
    @apply p-0;
  }
}
</style>
