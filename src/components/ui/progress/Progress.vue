<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

interface Props extends ProgressRootProps {
  class?: HTMLAttributes['class']
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
})

const clampedValue = computed(() => {
  const value = props.modelValue ?? 0
  return Math.min(Math.max(value, 0), 100)
})

const translateX = computed(() => {
  return `translateX(-${100 - clampedValue.value}%)`
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: translateX }"
    />
  </ProgressRoot>
</template>
