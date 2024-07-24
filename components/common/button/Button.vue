<template>
  <component :is="as" type="button" class="default-button" :class="[`size-${size}`, `variant-${variant}`]">
    <span v-if="$slots.icon" class="icon-container">
      <slot name="icon" />
    </span>
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
    type: String as PropType<"default" | "primary" | "light" | "error">,
    default: "default",
  },
  size: {
    type: String as PropType<"xs" | "sm" | "md">,
    default: "md",
  },
});
</script>

<style lang="scss">
.default-button {
  @apply flex items-center justify-center rounded-[100px] border border-transparent bg-neutral-200 p-4 text-center transition transition-colors wrap-balance disabled:opacity-70;

  background: linear-gradient(180deg, #fdfdfd 0%, #f5f4f0 100%);
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e2e0;
  color: #2fbf7a;

  &:is(label) {
    @apply cursor-pointer;
  }

  &:enabled,
  &:is(a, label) {
    &:not([aria-disabled="true"]):hover {
      border: 1px solid #00de73;
      color: #00de73;
    }

    &.variant-primary:hover {
      border: 1px solid #00de73;
      color: white !important;
    }
  }

  &:disabled {
    opacity: 0.35;
  }

  &.variant- {
    &primary {
      background: linear-gradient(180deg, #aaffd6 0%, #60f7af 100%);
    }

    &default {
      @apply text-neutral-700;
    }

    &light {
      @apply text-neutral-700;
    }

    &error {
      @apply bg-red-100/50 text-red-400;
      &:enabled,
      &:is(a, label) {
        &:not([aria-disabled="true"]) {
          @apply hover:bg-red-100/75;
        }
      }
    }
  }

  .icon-container {
    @apply -ml-0.5 mr-2 inline-flex items-center;

    svg {
      @apply block h-4 w-4;
    }
  }
}
</style>
