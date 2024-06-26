<template>
  <div class="relative h-full w-full bg-neutral-50 dark:bg-neutral-950">
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full"></canvas>
  </div>
</template>

<script lang="ts">
import { useWindowSize } from "@vueuse/core";
import { nextTick, onMounted, ref, watch } from "vue";

export default {
  name: "PatternCanvas",
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const { width, height } = useWindowSize();
    const { selectedColorMode } = useColorMode();

    const drawPattern = () => {
      const backgroundHex = selectedColorMode.value === "dark" ? "#11141A" : "#F7F9F3";
      const foregroundRgb =
        selectedColorMode.value === "dark" ? "rgba(100, 100, 100, 0.1)" : "rgba(236, 236, 236, 0.7)";

      try {
        const canvas = canvasRef.value;
        if (!canvas) {
          return;
        }

        canvas.width = width.value;
        canvas.height = height.value;

        const ctx = canvas.getContext("2d");
        if (!(ctx instanceof CanvasRenderingContext2D)) {
          return;
        }

        const path1 = new Path2D(
          "M23.5006 23.3495L18.0126 17.9941H9.34635L3.85831 23.3495L6.43337 25.8623L11.9214 20.5069C12.3919 20.0478 13.0122 19.7973 13.6795 19.7973C14.3468 19.7973 14.967 20.0478 15.4375 20.5069L20.9256 25.8623L23.5006 23.3495Z"
        );
        const path2 = new Path2D(
          "M18.928 16.4497L26.4221 18.4074L27.3632 14.9721L19.869 13.0144C19.2274 12.8475 18.6927 12.4468 18.359 11.8833C18.0254 11.3239 17.9399 10.6686 18.111 10.0425L20.1171 2.72948L16.5967 1.81118L14.5906 9.12419L18.9237 16.4456L18.928 16.4497Z"
        );
        const path3 = new Path2D(
          "M0.941051 18.4074L8.43524 16.4497L8.43952 16.4456L12.7726 9.12419L10.7665 1.81118L7.24609 2.72948L9.25224 10.0425C9.42334 10.6686 9.33779 11.3239 9.00415 11.8833C8.6705 12.4468 8.13582 12.8475 7.49419 13.0144L0 14.9721L0.941051 18.4074Z"
        );

        const pixelWidth = 50;
        const gridX = Math.ceil(width.value / pixelWidth);
        const gridY = Math.ceil(height.value / pixelWidth);

        for (let ix = 0; ix < gridX + 1; ix++) {
          for (let iy = 0; iy < gridY + 1; iy++) {
            ctx.save();

            const x = ix * pixelWidth - pixelWidth / 2;
            const y = iy * pixelWidth - pixelWidth / 2;
            ctx.strokeStyle = foregroundRgb;
            ctx.strokeRect(x, y, pixelWidth, pixelWidth);

            const scale = 0.5;
            ctx.translate(x - 13 * scale, y - 13 * scale);
            ctx.scale(scale, scale);

            ctx.fillStyle = backgroundHex;
            ctx.fillRect(0, 0, 40, 40);

            ctx.fillStyle = foregroundRgb;
            ctx.fill(path1);
            ctx.fill(path2);
            ctx.fill(path3);

            ctx.restore();
          }
        }
      } catch (error) {
        // console.error("Error while drawing pattern:", error);
      }
    };

    onMounted(async () => {
      await nextTick();
      if (canvasRef.value) {
        drawPattern();
      } else {
        // console.error("Canvas reference not yet available");
      }
    });

    watch([width, height, selectedColorMode], () => {
      if (canvasRef.value) {
        drawPattern();
      }
    });

    return {
      canvasRef,
    };
  },
};
</script>
