<template>
  <div class="app-layout">
    <LoadersConnecting />
    <ModalConnectingWalletError />
    <ModalNetworkChangedWarning v-if="!isConnectingWallet" />
    <ModalLegalNotice />

    <main class="app-layout-main">
      <div class="container">
        <div class="sidebar hidden lg:block">
          <CommonSidebar />
        </div>

        <div class="content">
          <Header />
          <NuxtPage />
        </div>
      </div>
    </main>

    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts" setup>
const { isConnectingWallet } = storeToRefs(useOnboardStore());
</script>

<style lang="scss" scoped>
.app-layout {
  @apply relative w-full;

  min-height: 100vh;
  min-height: 100dvh;
  // padding-top: 6px;
  background: #f3f2ee;
  color: #000000;

  @media only screen and (min-width: 1024px) {
    padding-top: 0;
  }

  .app-layout-main {
    @apply relative z-10 w-full flex-col justify-self-center lg:py-4;
  }

  .container {
    max-width: none;
    width: calc(100% - 2rem);
    display: grid;
    margin: 0 auto;
    gap: 0 0.5rem;
    grid-template-columns: repeat(8, 1fr);

    @media only screen and (min-width: 768px) {
      width: calc(100% - 3rem);
    }

    @media only screen and (min-width: 1024px) {
      grid-template-columns: repeat(12, 1fr);
      width: calc(100% - 5rem);
      max-width: 1440px;
      gap: 0 0.75rem;
      padding-top: 120px;
    }
  }

  .sidebar {
    grid-column: 1 / -1;

    @media only screen and (min-width: 1024px) {
      grid-column: span 3 / span 3;
    }
  }

  .content {
    grid-column: 1 / -1;

    @media only screen and (min-width: 1024px) {
      grid-column: 5 / span 8;
    }

    @media only screen and (min-width: 1440px) {
      grid-column: 6 / span 7;
    }
  }
}
</style>
