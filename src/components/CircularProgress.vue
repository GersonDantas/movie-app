<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'

interface Props extends ProgressRootProps {
  class?: string
  value: number
  size?: number
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  strokeWidth: 4
})

const clampedValue = computed(() => {
  const numValue = Number(props.value)
  return Math.round(Math.min(Math.max(isNaN(numValue) ? 0 : numValue, 0), 100))
})

const colorClass = computed(() => {
  if (clampedValue.value >= 70) return 'bg-green-500'
  if (clampedValue.value >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
})

const circleStyles = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: '50%',
  borderWidth: `${props.strokeWidth}px`
}))
</script>

<template>
  <div 
    class="relative"
    :style="circleStyles"
    data-testid="circular-progress"
  >
    <ProgressRoot
      :value="clampedValue"
      class="absolute inset-0 flex items-center justify-center"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuetext="`${clampedValue}%`"
      :aria-label="`${clampedValue}%`"
      data-state="indeterminate"
      data-max="100"
    >
      <div class="absolute inset-0 rounded-full border-gray-700" />
      <div 
        :class="['absolute inset-0 rounded-full transition-transform', colorClass]"
        data-state="indeterminate"
        data-max="100"
        :style="{
          transform: `rotate(${(clampedValue / 100) * 360}deg)`
        }"
      ></div>
      <span 
        class="relative font-bold text-white z-10"
        :style="{ fontSize: `${size / 3}px` }"
        data-testid="progress-value"
      >
        {{ clampedValue }}%
      </span>
    </ProgressRoot>
  </div>
</template>

<style scoped>
.progress-indicator {
  transform-origin: center;
  transition: transform 0.2s ease-in-out;
}
</style> 
