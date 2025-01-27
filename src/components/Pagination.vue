<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

interface Props {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (page: number) => void
}

const props = defineProps<Props>()

const pages = computed(() => Math.ceil(props.totalCount / props.perPage))

const handlePageChange = (newPage: number) => {
  if (newPage >= 0 && newPage < pages.value) {
    props.onPageChange(newPage)
  }
}

const goToFirstPage = () => handlePageChange(0)
const goToPreviousPage = () => handlePageChange(props.pageIndex - 1)
const goToNextPage = () => handlePageChange(props.pageIndex + 1)
const goToLastPage = () => handlePageChange(pages.value - 1)
</script>

<template>
  <div class="flex items-center justify-between">
    <span class="text-sm text-muted-foreground">
      Total de {{ totalCount }} resultados
    </span>

    <div class="flex items-center gap-6 lg:gap-8">
      <div class="text-sm font-medium">
        Página {{ pageIndex + 1 }} de {{ pages }}
      </div>
      <div class="flex items-center gap-2">
        <Button 
          variant="outline" 
          class="rounded-full"
          :disabled="pageIndex === 0"
          @click="goToFirstPage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
          <span class="sr-only">Primeira Página</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-full"
          :disabled="pageIndex === 0"
          @click="goToPreviousPage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span class="sr-only">Página anterior</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-full"
          :disabled="pageIndex === pages - 1"
          @click="goToNextPage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          <span class="sr-only">Próxima página</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-full"
          :disabled="pageIndex === pages - 1"
          @click="goToLastPage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
          <span class="sr-only">Última Página</span>
        </Button>
      </div>
    </div>
  </div>
</template> 
