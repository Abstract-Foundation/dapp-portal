<template>
  <Menu v-slot="{ open }" as="div" class="account-dropdown-container">
    <HeaderHelpModal v-model:opened="helpModalOpened" />
    <MenuButton as="div">
      <div ref="addressEl">
        <HeaderAccountDropdownButton :toggled="open" />
      </div>
    </MenuButton>

    <transition v-bind="TransitionAlertScaleInOutTransition">
      <MenuItems class="account-options-container">
        <MenuItem v-slot="{ active }" as="template">
          <ABSButton :active="active" inline mono @click="copy()">
            <div class="button-inner">
              <DocumentDuplicateIcon aria-hidden="true" class="w-5" />
              <span>Copy address</span>
            </div>
          </ABSButton>
        </MenuItem>

        <MenuItem v-if="selectedNetwork.blockExplorerUrl" v-slot="{ active }" as="template">
          <ABSButton
            :href="`${selectedNetwork.blockExplorerUrl}/address/${account.address!}`"
            :active="active"
            inline
            mono
            new-tab
          >
            <div class="button-inner">
              <Squares2X2Icon aria-hidden="true" class="w-5" />
              <span>Explorer</span>
            </div>
          </ABSButton>
        </MenuItem>

        <MenuItem v-slot="{ active }" as="template">
          <ABSButton :active="active" inline mono @click="helpModalOpened = true">
            <div class="button-inner">
              <ExclamationCircleIcon aria-hidden="true" class="w-5" />
              <span>Help</span>
            </div>
          </ABSButton>
        </MenuItem>

        <MenuItem v-slot="{ active }" as="template">
          <ABSButton :active="active" inline mono @click="onboardStore.disconnect()">
            <div class="button-inner">
              <PowerIcon aria-hidden="true" class="w-5" />
              <span>Logout</span>
            </div>
          </ABSButton>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { DocumentDuplicateIcon, ExclamationCircleIcon, PowerIcon, Squares2X2Icon } from "@heroicons/vue/24/outline";
import { useTippy } from "vue-tippy";

import ABSButton from "@/components/common/button/ABSButton.vue";

const onboardStore = useOnboardStore();
const { account } = storeToRefs(onboardStore);
const { selectedNetwork } = storeToRefs(useNetworkStore());

const { copy, copied } = useCopy(computed(() => account.value.address!));
const addressEl = ref<HTMLElement | undefined>();
const tooltip = useTippy(addressEl, {
  content: "Address copied!",
  trigger: "manual",
  hideOnClick: false,
});
watch(
  copied,
  (copied) => {
    if (copied) {
      tooltip.show();
    } else {
      tooltip.hide();
    }
  },
  { immediate: true }
);

const helpModalOpened = ref(false);
</script>

<style lang="scss" scoped>
.account-dropdown-container {
  @apply relative;

  .account-options-container {
    @apply absolute right-0 top-full z-10 mt-4 flex h-max w-max min-w-full flex-col items-start gap-y-2 rounded-[32px] bg-white p-2;

    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.1);

    .options-item {
      @apply w-full;
    }
  }

  .button-inner {
    @apply relative flex gap-x-1;
  }
}
</style>
