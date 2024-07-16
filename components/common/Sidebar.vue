<template>
  <aside class="content">
    <h1 class="d1">ABS Portal</h1>

    <p class="b3">Status: <span v-if="isConnected">Connected</span><span v-else>Disconnected</span></p>

    <p class="b1">Connect your wallet to view balances, your latest transfers, and bridge to Abstract mainnet.</p>
  </aside>
</template>

<script lang="ts" setup>
const { isConnected } = storeToRefs(useOnboardStore());
</script>

<style lang="scss" scoped>
.content {
  @apply relative flex flex-col gap-y-4;
}
</style>
