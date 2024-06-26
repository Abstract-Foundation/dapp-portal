<template>
  <div class="app-layout">
    <LoadersConnecting />
    <ModalConnectingWalletError />
    <ModalNetworkChangedWarning v-if="!isConnectingWallet" />
    <ModalLegalNotice />

    <Header />
    <main class="app-layout-main">
      <NuxtPage />
    </main>

    <div class="pattern-background">
      <CommonPatternCanvas />
    </div>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
const { isConnectingWallet } = storeToRefs(useOnboardStore());
</script>

<style lang="scss" scoped>
.app-layout {
  @apply grid;
  min-height: 100vh;
  min-height: 100dvh;
  grid-template-rows: auto 1fr max-content;

  .app-layout-main {
    @apply relative z-10 flex min-h-0 w-full min-w-0 max-w-[700px] flex-col justify-self-center p-2 md:px-0 md:py-4;
  }
}

.pattern-background {
  @apply pointer-events-none fixed inset-0;
  background-color: var(--color-background);
}
</style>
