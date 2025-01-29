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
  <div class="p-4 border rounded-lg shadow-sm text-center">
    <img v-if="character.image" :src="character.image" :alt="character.name" class="w-24 h-24 mx-auto rounded-full mb-2">
    <h2 class="text-lg font-semibold">
      {{ character.name }}
    </h2>
    <div class="text-sm text-gray-600">
      <div>
        <p v-if="character.gender" class="text-sm text-gray-400">
          {{ character.species }} -  {{ character.status }} - {{ character.gender }}
        </p>
        <p v-if="character.status" class="text-sm text-gray-400" />
        <p v-if="character.origin?.name" class="text-sm text-gray-400">
          Origin: {{ character.origin.name || 'Unknown' }}
        </p>
      </div>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" @click="actionClick">
        View Details
      </button>
    </div>
  </div>
</template>
