<script setup lang="ts">
import ListCard from '@/components/ListCard.vue'
import { defineProps } from 'vue'

defineProps<{ characters: any[], goToDetails: (id: string | number) => void }>()
</script>

<template>
  <section class="space-y-4">
    <ListCard
      v-for="character in characters"
      :key="character.id || character.name"
      :character="character"
      @view-details="goToDetails"
    />
  </section>
</template>
