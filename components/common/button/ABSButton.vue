<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="newTab ? '_blank' : undefined"
    :rel="newTab ? 'noopener noreferrer' : undefined"
    :class="['abs-button', { active, inline, mono, transparent }, className]"
    type="buttonType ? buttonType : 'button'"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <svg v-if="icon === 'wallet'" viewBox="0 0 18 18" fill="none" class="mr-2 h-4 w-4">
      <path d="M-2.28845e-05 14.5L2.5 14.5L2.5 17" stroke="currentColor" />
      <path d="M5.00002 14.5L2.5 14.5L2.5 12" stroke="currentColor" />
      <path
        d="M6 15.5H14.5C15.6046 15.5 16.5 14.6046 16.5 13.5V4.5C16.5 3.39543 15.6046 2.5 14.5 2.5H4.5C3.39543 2.5 2.5 3.39543 2.5 4.5V10.5"
        stroke="currentColor"
      />
      <path d="M16 6.5H13C11.8954 6.5 11 7.39543 11 8.5V9.5C11 10.6046 11.8954 11.5 13 11.5H16" stroke="currentColor" />
    </svg>

    <span ref="textRef" class="button-content button">
      <slot />
    </span>

    <svg
      v-if="icon === 'arrow-up'"
      class="ml-2 h-4 w-4"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4.5V7.5C9.5 7.63261 9.44732 7.75978 9.35355 7.85355C9.25979 7.94732 9.13261 8 9 8C8.86739 8 8.74022 7.94732 8.64645 7.85355C8.55268 7.75978 8.5 7.63261 8.5 7.5V5.70687L5.35375 8.85375C5.3073 8.9002 5.25215 8.93705 5.19145 8.96219C5.13075 8.98734 5.0657 9.00028 5 9.00028C4.9343 9.00028 4.86925 8.98734 4.80855 8.96219C4.74786 8.93705 4.69271 8.9002 4.64625 8.85375C4.5998 8.80729 4.56295 8.75214 4.53781 8.69145C4.51266 8.63075 4.49972 8.5657 4.49972 8.5C4.49972 8.4343 4.51266 8.36925 4.53781 8.30855C4.56295 8.24785 4.5998 8.1927 4.64625 8.14625L7.79313 5H6C5.86739 5 5.74022 4.94732 5.64645 4.85355C5.55268 4.75978 5.5 4.63261 5.5 4.5C5.5 4.36739 5.55268 4.24021 5.64645 4.14645C5.74022 4.05268 5.86739 4 6 4H9C9.13261 4 9.25979 4.05268 9.35355 4.14645C9.44732 4.24021 9.5 4.36739 9.5 4.5ZM13.5 6.5C13.5 7.78558 13.1188 9.04228 12.4046 10.1112C11.6903 11.1801 10.6752 12.0132 9.48744 12.5052C8.29972 12.9972 6.99279 13.1259 5.73191 12.8751C4.47104 12.6243 3.31285 12.0052 2.40381 11.0962C1.49477 10.1872 0.875702 9.02896 0.624899 7.76809C0.374095 6.50721 0.502816 5.20028 0.994786 4.01256C1.48676 2.82484 2.31988 1.80968 3.3888 1.09545C4.45772 0.381218 5.71442 0 7 0C8.72335 0.00181989 10.3756 0.687223 11.5942 1.90582C12.8128 3.12441 13.4982 4.77665 13.5 6.5ZM12.5 6.5C12.5 5.4122 12.1774 4.34883 11.5731 3.44436C10.9687 2.53989 10.1098 1.83494 9.10476 1.41866C8.09977 1.00238 6.9939 0.893462 5.927 1.10568C4.86011 1.3179 3.8801 1.84172 3.11091 2.61091C2.34173 3.3801 1.8179 4.36011 1.60568 5.427C1.39346 6.4939 1.50238 7.59976 1.91867 8.60476C2.33495 9.60975 3.0399 10.4687 3.94437 11.0731C4.84884 11.6774 5.9122 12 7 12C8.45818 11.9983 9.85617 11.4183 10.8873 10.3873C11.9184 9.35617 12.4983 7.95818 12.5 6.5Z"
        fill="currentColor"
      />
    </svg>
  </component>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ref, watchEffect } from "vue";

const props = defineProps({
  href: String,
  onClick: Function,
  //
  className: String,
  icon: String,
  //
  active: Boolean,
  disabled: Boolean,
  inline: Boolean,
  mono: Boolean,
  newTab: Boolean,
  transparent: Boolean,
  type: Boolean,
});

const hovering = ref(false);
const textRef = ref(null);

const handleClick = () => {
  if (props.onClick) props.onClick();
};

const onMouseEnter = () => {
  hovering.value = true;
};

const onMouseLeave = () => {
  hovering.value = false;
};

watchEffect(() => {
  if (!textRef.value || props.inline) return;

  const text = textRef.value;

  if (window.innerWidth > 1024 && !props.transparent) {
    gsap.killTweensOf(text);

    if (hovering.value) {
      gsap
        .timeline()
        .to(text, {
          y: "-100%",
          ease: "back.in(2)",
          duration: 0.15,
        })
        .to(text, {
          duration: 0,
          y: "100%",
        })
        .to(text, {
          duration: 0.3,
          ease: "back.out(2.5)",
          y: "0",
        });
    } else {
      gsap.to(text, {
        y: "0",
        duration: 0.3,
        ease: "back.out(2.5)",
      });
    }
  }
});
</script>

<style scoped>
.abs-button {
  @apply relative z-20 flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-transparent p-4 shadow-md transition-colors duration-300 ease-in-out;

  font-weight: 500;

  background: linear-gradient(180deg, #aaffd6 0%, #60f7af 100%);
  box-shadow: 0px 1px 0px 0px #60f7af inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.2509803922) inset,
    0px 2px 1.3px 0px rgba(0, 0, 0, 0.1019607843);
  color: #2fbf7a;
  border: 1px solid transparent;
}

.abs-button.inline {
  display: inline-block;
}

.abs-button.mono {
  background: linear-gradient(180deg, #fdfdfd 0%, #f5f4f0 100%);
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e2e0;
  color: #05472a;
}
.abs-button:not(.mono):hover {
  border: 1px solid #00de73;
  color: white;
}

.abs-button.mono.active {
  @apply bg-white;

  border: 1px solid #00de73;
  color: #00de73;
}

.abs-button.mono:hover {
  border: 1px solid #00de73;
  color: #00de73;
}

.button-content {
  @apply relative block;
}
</style>
