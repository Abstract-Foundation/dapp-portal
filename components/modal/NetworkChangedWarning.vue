<template>
  <CommonModal v-model:opened="modalOpened" title="Network switched" @after-leave="afterModalLeave">
    <p class="b2">
      The selected network has been automatically changed
      <span v-if="lastSelectedNetwork"
        >from <span>{{ lastSelectedNetwork.name }}</span>
      </span>
      to
      <span>{{ selectedNetwork.name }}</span> since your last use of zkSync Portal.
    </p>
    <TypographyCategoryLabel class="b2">Optional settings</TypographyCategoryLabel>
    <CommonCheckbox v-model="doNotSwitchNetwork" class="b3">Do not switch network automatically</CommonCheckbox>
    <CommonCheckbox v-model="warningDisabled" class="b3">Do not show this warning</CommonCheckbox>
    <div class="mt-4 flex flex-col items-center">
      <CommonButtonTopLink
        v-if="lastSelectedNetwork"
        as="a"
        class="b3"
        :href="getNetworkUrl(lastSelectedNetwork, route.fullPath)"
        @click="setCheckboxValues"
      >
        Return to {{ lastSelectedNetwork?.name }}
      </CommonButtonTopLink>
      <ABSButton @click="closeModal"> Continue on {{ selectedNetwork.name }} </ABSButton>
    </div>
  </CommonModal>
</template>

<script lang="ts" setup>
import ABSButton from "@/components/common/button/ABSButton.vue";

const networkStore = useNetworkStore();
const {
  selectedNetwork,
  networkChangedWarning,
  networkChangedWarningDisabled,
  lastSelectedNetwork,
  networkUsesLocalStorage,
} = storeToRefs(networkStore);

const route = useRoute();

const modalOpened = ref(networkChangedWarning.value);
watch(networkChangedWarning, (val) => {
  modalOpened.value = val;
});

const doNotSwitchNetwork = ref(networkUsesLocalStorage.value);
watch(networkUsesLocalStorage, (val) => {
  doNotSwitchNetwork.value = val;
});
const warningDisabled = ref(networkChangedWarningDisabled.value);
watch(networkChangedWarningDisabled, (val) => {
  warningDisabled.value = val;
});

const setCheckboxValues = () => {
  networkUsesLocalStorage.value = doNotSwitchNetwork.value;
  networkChangedWarningDisabled.value = warningDisabled.value;
};
const closeModal = () => {
  modalOpened.value = false;
};
const afterModalLeave = () => {
  networkStore.resetNetworkChangeWarning();
  setCheckboxValues();
};
</script>
