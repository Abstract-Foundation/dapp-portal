<template>
  <component :is="as" class="content-block-container" :class="[`variant-${variant}`, { transparent: transparent }]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  as: {
    type: [String, Object] as PropType<string | Component>,
    default: "div",
  },
  variant: {
    type: String as PropType<"default" | "unpadded">,
    default: "default",
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.content-block-container {
  @apply block h-max w-full rounded-3xl bg-white p-3 lg:px-6 lg:pb-8 lg:pt-6;

  &.variant-unpadded {
    @apply p-0;
  }

  &.transparent {
    @apply bg-transparent;
  }
}
</style>
