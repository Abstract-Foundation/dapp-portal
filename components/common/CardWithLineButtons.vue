<template>
  <CommonContentBlock :transparent="transparent" variant="unpadded">
    <CommonLineButtonsGroup>
      <slot />
    </CommonLineButtonsGroup>
  </CommonContentBlock>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
