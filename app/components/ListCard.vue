<script lang="ts" setup>
defineProps<{
  characters: Array<{
    id: number | string
    name: string
    image?: string
    status?: string
    species?: string
  }>
}>()
</script>

<template>
  <div v-for="character in characters" :key="character.id || character.name" class="p-4 border rounded-lg shadow-sm flex items-center space-x-4">
    <img v-if="character.image" :src="character.image" :alt="character.name" class="w-16 h-16 rounded-full">
    <div>
      <h2 class="text-lg font-semibold">
        {{ character.name }}
      </h2>
      <p v-if="character.status" class="text-sm text-gray-500">
        {{ character.status }} - {{ character.species }}
      </p>
    </div>
  </div>
</template>
