<script lang="ts" setup>
import type { Character } from '~/models/character'

const props = defineProps<{
  character: Character
}>()
const emit = defineEmits<{
  (event: 'actionClick', character: Character): void
}>()

function actionClick() {
  emit('actionClick', props.character)
}
</script>

<template>
  <div class="p-4 border rounded-lg shadow-sm flex items-center space-x-4">
    <img v-if="character.image" :src="character.image" :alt="character.name" class="w-16 h-16 rounded-full">
    <div class="flex-1">
      <h2 class="text-lg font-semibold">
        {{ character.name }}
      </h2>
      <p v-if="character.status" class="text-sm text-gray-500">
        {{ character.species }} - {{ character.status }} - {{ character.gender }}
      </p>
      <p v-if="character.origin" class="text-sm text-gray-500">
        Origin: {{ character.origin.name }}
      </p>
    </div>
    <div>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="actionClick">
        View Details
      </button>
    </div>
  </div>
</template>
