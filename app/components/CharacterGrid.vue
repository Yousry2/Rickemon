<script setup lang="ts">
import GridCard from '@/components/GridCard.vue'
import { defineProps } from 'vue'

defineProps<{ characters: any[], goToDetails: (id: string | number) => void }>()
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <GridCard
      v-for="character in characters"
      :key="character.id || character.name"
      :character="character"
      @view-details="goToDetails"
    />
  </section>
</template>
