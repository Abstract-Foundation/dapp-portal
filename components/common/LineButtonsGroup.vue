<template>
  <div class="line-buttons-group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  marginX: {
    type: Boolean,
    default: true,
  },
  marginY: {
    type: Boolean,
    default: true,
  },
  gap: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.line-buttons-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
}
</style>
