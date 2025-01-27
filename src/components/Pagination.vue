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
          class="rounded-lg bg-gray-800 hover:bg-gray-700"
          :disabled="pageIndex === 0"
          @click="goToFirstPage"
        >
          <v-icon name="fa-angle-double-left" />
          <span class="sr-only">Primeira Página</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-lg bg-gray-800 hover:bg-gray-700"
          :disabled="pageIndex === 0"
          @click="goToPreviousPage"
        >
          <v-icon name="fa-angle-left" />
          <span class="sr-only">Página anterior</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-lg bg-gray-800 hover:bg-gray-700"
          :disabled="pageIndex === pages - 1"
          @click="goToNextPage"
        >
          <v-icon name="fa-angle-right" />
          <span class="sr-only">Próxima página</span>
        </Button>
        <Button 
          variant="outline" 
          class="rounded-lg bg-gray-800 hover:bg-gray-700"
          :disabled="pageIndex === pages - 1"
          @click="goToLastPage"
        >
          <v-icon name="fa-angle-double-right" />
          <span class="sr-only">Última Página</span>
        </Button>
      </div>
    </div>
  </div>
</template> 
