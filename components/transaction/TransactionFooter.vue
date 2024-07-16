<template>
  <div class="transaction-footer">
    <!-- Change network -->
    <transition v-bind="TransitionAlertScaleInOutTransition">
      <CommonErrorBlock
        v-if="buttonStep === 'network' && switchingNetworkError"
        class="mb-2"
        @try-again="eraWalletStore.setCorrectNetwork"
      >
        Network change error: {{ switchingNetworkError.message }}
      </CommonErrorBlock>
    </transition>

    <div v-if="buttonStep === 'connect'" class="transaction-footer-row">
      <ABSButton :disabled="isConnectingWallet" class="w-full" icon="wallet" @click="onboardStore.openModal">
        Connect wallet
      </ABSButton>
    </div>
    <div v-if="buttonStep === 'network'" class="transaction-footer-row">
      <CommonButtonTopInfo>Incorrect network selected in your wallet</CommonButtonTopInfo>
      <ABSButton
        v-if="connectorName !== 'WalletConnect'"
        type="submit"
        :disabled="switchingNetworkInProgress"
        class="w-full"
        mono
        @click="eraWalletStore.setCorrectNetwork"
      >
        Change wallet network to {{ eraNetwork.name }}
      </ABSButton>
      <ABSButton v-else disabled class="w-full" mono>
        Change network manually to {{ eraNetwork.name }} in your {{ walletName }} wallet
      </ABSButton>
    </div>
    <div v-else-if="buttonStep === 'continue'" class="transaction-footer-row">
      <slot name="after-checks" />
    </div>

    <TransactionButtonUnderlineContinueInWallet :opened="continueInWalletTipDisplayed" />
  </div>
</template>

<script lang="ts" setup>
import ABSButton from "@/components/common/button/ABSButton.vue";

const onboardStore = useOnboardStore();
const eraWalletStore = useZkSyncWalletStore();

const { account, isConnectingWallet, connectorName, walletName } = storeToRefs(onboardStore);
const { isCorrectNetworkSet, switchingNetworkInProgress, switchingNetworkError } = storeToRefs(eraWalletStore);
const { eraNetwork } = storeToRefs(useZkSyncProviderStore());

const buttonStep = computed(() => {
  if (!account.value.address || isConnectingWallet.value) {
    return "connect";
  } else if (!isCorrectNetworkSet.value) {
    return "network";
  } else {
    return "continue";
  }
});

const continueInWalletTipDisplayed = computed(() => {
  if (buttonStep.value === "network" && switchingNetworkInProgress.value) {
    return true;
  }
  return false;
});
</script>

<style lang="scss" scoped>
.transaction-footer {
  @apply sticky bottom-0 z-10 flex flex-col items-center pb-2 pt-4;

  .transaction-footer-row {
    @apply flex w-full flex-col items-center;
  }
}
</style>
