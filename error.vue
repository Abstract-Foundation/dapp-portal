<template>
  <div class="error-layout">
    <Header />
    <div class="error-info-container">
      <h1 class="error-status-code">{{ error.statusCode }}</h1>
      <p v-if="error.statusCode !== 404" class="error-message">{{ sanitizedErrorMessage }}</p>
      <CommonButton as="RouterLink" :to="{ name: 'bridge' }" class="mt-4" variant="primary">
        Back to Bridge
      </CommonButton>
    </div>
  </div>
</template>

<script lang="ts">
import DOMPurify from "dompurify";
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<{ statusCode: number; message: string }>,
      required: true,
      validator: (value: { statusCode: number; message: string }) => {
        return typeof value.statusCode === "number" && typeof value.message === "string";
      },
    },
  },
  setup(props: { error: { statusCode: number; message: string } }) {
    const sanitizedErrorMessage = computed(() => {
      return DOMPurify.sanitize(props.error.message);
    });

    return {
      sanitizedErrorMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-layout {
  @apply grid grid-rows-[auto_1fr];
  min-height: 100vh;
  min-height: 100dvh;

  .error-info-container {
    @apply mx-auto flex h-full w-11/12 max-w-md flex-col items-center justify-center px-4 py-2 leading-normal md:px-0 md:py-4;

    .error-status-code {
      @apply mb-2 text-9xl font-normal;
    }
    .error-message {
      @apply whitespace-pre-line break-words break-all text-center wrap-balance;
    }
  }
}
</style>
