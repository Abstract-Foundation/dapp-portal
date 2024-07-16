<template>
  <CommonContentBlock>
    <p class="text-center">
      <slot />
    </p>
    <ABSButton class="mt-block-gap w-full" icon="wallet" @click="onboardStore.openModal()">Connect wallet</ABSButton>
  </CommonContentBlock>
</template>

<script lang="ts" setup>
import ABSButton from "@/components/common/button/ABSButton.vue";
const onboardStore = useOnboardStore();
</script>
