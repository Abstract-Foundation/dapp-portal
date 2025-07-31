<template>
  <Menu v-slot="{ open }" as="div" class="network-dropdown-container">
    <MenuButton as="template">
      <CommonButtonDropdown :toggled="open">
        <template #left-icon>
          <IconsEra />
        </template>
        <span>{{ selectedNetwork.name }}</span>
      </CommonButtonDropdown>
    </MenuButton>

    <transition v-bind="TransitionAlertScaleInOutTransition">
      <MenuItems class="network-options-container">
        <div v-for="item in mainnetList.filter((e) => !e.hidden)" :key="item.key">
          <MenuItem as="template">
            <ABSButton class-name="w-full" inline mono :active="isNetworkSelected(item)" @click="buttonClicked(item)">
              <div class="button-inner">
                <IconsEra class="w-5" /><span>{{ item.name }}</span>
                <CheckIcon v-if="isNetworkSelected(item)" aria-hidden="true" class="w-5" />
              </div>
            </ABSButton>
          </MenuItem>
        </div>
        <template v-if="testnetList.length > 0">
          <hr class="border-neutral-200 dark:border-neutral-800" />
          <p class="mt-2 pl-3 text-xs font-bold text-neutral-600">Testnets</p>
        </template>
        <div v-for="item in testnetList.filter((e) => !e.hidden)" :key="item.key">
          <MenuItem as="template">
            <ABSButton class-name="w-full" inline mono :active="isNetworkSelected(item)" @click="buttonClicked(item)">
              <div class="button-inner">
                <IconsEra class="w-5" /><span>{{ item.name }}</span>
                <CheckIcon v-if="isNetworkSelected(item)" aria-hidden="true" class="w-5" />
              </div>
            </ABSButton>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

import ABSButton from "@/components/common/button/ABSButton.vue";
import { chainList } from "@/data/networks";

import type { ZkSyncNetwork } from "@/data/networks";

const mainnetList = computed(() => chainList.filter((e) => e.displaySettings && !e.displaySettings.isTestnet));
const testnetList = computed(() => chainList.filter((e) => e.displaySettings && e.displaySettings.isTestnet));

const route = useRoute();

const { selectedNetwork } = storeToRefs(useNetworkStore());

const isNetworkSelected = (network: ZkSyncNetwork) => selectedNetwork.value.key === network.key;

const buttonClicked = (network: ZkSyncNetwork) => {
  if (isNetworkSelected(network)) {
    return;
  }
  window.location.href = getNetworkUrl(network, route.fullPath);
};
</script>

<style lang="scss" scoped>
.network-dropdown-container {
  @apply relative;

  .network-options-container {
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
