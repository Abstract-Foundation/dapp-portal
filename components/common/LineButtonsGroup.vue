<template>
  <div class="line-buttons-group">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.line-buttons-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
}
</style>
