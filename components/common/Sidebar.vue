<template>
  <aside class="content">
    <h1 class="d1">Abstract Bridge</h1>

    <p class="status-text b3">
      <span v-if="isConnected" className="walletState connected"></span>
      <span v-else className="walletState"></span>
      <span>Status: <span v-if="isConnected">Connected</span> <span v-else>Disconnected</span></span>
    </p>

    <p class="b1">Connect your wallet to view balances, your latest transfers, and bridge to Abstract mainnet.</p>
  </aside>
</template>

<script lang="ts" setup>
const { isConnected } = storeToRefs(useOnboardStore());
</script>

<style lang="scss" scoped>
.content {
  @apply relative flex flex-col gap-y-4;

  .status-text {
    @apply flex items-center;
  }

  @keyframes pulse {
    0% {
      transform: translate3d(-50%, -50%, 0) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate3d(-50%, -50%, 0) scale(0.75);
      opacity: 0.5;
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scale(1);
      opacity: 0;
    }
  }

  .walletState {
    @apply relative mr-2 block h-3 w-3 rounded-full;

    background: red;

    &:before {
      @apply absolute rounded-full;

      animation: 3s pulse infinite;

      content: "";

      transform: translate3d(-50%, -50%, 0);

      width: 300%;
      height: 300%;
      top: 50%;
      left: 50%;
      background: red;
    }
  }
  .walletState.connected {
    background: #00de73;

    &:before {
      background: #00de73;
    }
  }
}
</style>
