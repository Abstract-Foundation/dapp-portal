<template>
  <Dialog as="template" :open="modalOpened">
    <DialogPanel class="mobile-navigation-container">
      <div class="relative mx-auto">
        <div class="navigation-header">
          <div></div>
          <CommonButton @click="close()">
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </CommonButton>
        </div>
        <div class="navigation-body">
          <slot />
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (eventName: "update:opened", value: boolean): void;
}>();

const route = useRoute();
watch(
  () => route.name,
  () => {
    close();
  }
);

const openedTab = ref<"main" | "network">("main");
const modalOpened = computed({
  get: () => props.opened,
  set: (value) => emit("update:opened", value),
});
watch(
  () => props.opened,
  (value) => {
    if (!value) {
      openedTab.value = "main";
    }
  }
);
const close = () => {
  modalOpened.value = false;
};
</script>

<style scoped lang="scss">
.mobile-navigation-container {
  @apply fixed left-0 top-0 z-[60] w-full overflow-y-auto overflow-x-hidden bg-neutral-50;

  height: 100vh;
  height: 100dvh;

  .navigation-header {
    @apply sticky top-0 flex items-center justify-between px-4 pb-2 pt-1 text-black backdrop-blur md:px-6;

    .navigation-title {
      @apply mb-0;
    }
  }
  .navigation-body {
    @apply relative px-4 pb-2 pt-1 md:px-6;
  }
}
</style>
