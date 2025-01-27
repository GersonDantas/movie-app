<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4 text-tmdb-secondary">404</h1>
      <h2 class="text-2xl font-semibold mb-6 text-foreground">Página não encontrada</h2>
      <p class="text-muted-foreground mb-8">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Button 
        variant="secondary" 
        class="bg-tmdb-secondary hover:bg-tmdb-secondary/90"
        @click="router.push('/')"
      >
        Voltar para Home
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()
</script> 
