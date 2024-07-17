<template>
  <CommonHeightTransition :opened="opened">
    <div class="b3 mt-2 text-center text-gray-400">
      <slot />
    </div>
  </CommonHeightTransition>
</template>

<script lang="ts" setup>
defineProps({
  opened: {
    type: Boolean,
    required: true,
  },
});
</script>
