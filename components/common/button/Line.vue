<template>
  <component :is="as" class="line-button-container" :class="[`size-${size}`, `variant-${variant}`]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps({
  as: {
    type: [String, Object] as PropType<string | Component>,
    default: "button",
  },
  variant: {
    type: String as PropType<"default" | "primary">,
    default: "default",
  },
  size: {
    type: String as PropType<"md" | "sm">,
    default: "md",
  },
});
</script>

<style lang="scss" scoped>
.line-button-container {
  @apply w-full rounded-[1.24rem] py-2 transition-colors;

  &:enabled,
  &:is(a) {
    &:not([aria-disabled="true"]) {
      @apply cursor-pointer;
    }
  }
  &:disabled,
  &[aria-disabled="true"] {
    @apply cursor-not-allowed opacity-75;
  }

  &.variant- {
    &primary {
      @apply bg-primary-800;

      &:enabled,
      &:is(a) {
        &:not([aria-disabled="true"]) {
          @apply hover:bg-primary-400;
        }
      }
    }
    &default {
      @apply w-full;

      &:enabled,
      &:is(a) {
        &:not([aria-disabled="true"]) {
          @apply hover:bg-mono-100;
        }
      }
    }
  }
}
</style>
