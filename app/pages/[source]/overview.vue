<script setup lang="ts">
import type { SourceOption, ViewOption } from '@/config/constants'
import CharacterGrid from '@/components/CharacterGrid.vue'
import CharacterList from '@/components/CharacterList.vue'
import SourceSwitcher from '@/components/SourceSwitcher.vue'
import ViewSwitcher from '@/components/ViewSwitcher.vue'
import { useFetchCharacters } from '@/composables/useFetchCharacters'
import { SOURCES, VIEW_MODES } from '@/config/constants'
import { useCharacterStore } from '@/stores/characters'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const source = route.params.source
const characterStore = useCharacterStore()
const { characters, info, isLoading, error } = characterStore

const { page, fetchCharacters } = useFetchCharacters()

const view = ref<string>((route.query.view as string) ?? VIEW_MODES[0]?.key)

const title = computed(() => SOURCES.find(s => s.key === source.value)?.label || 'Characters')

function setView(newView: ViewOption): void {
  view.value = newView.key
  router.push({ name: 'source-overview', params: { source: source.value }, query: { view: newView.key } })
}

function switchSource(newSource: SourceOption): void {
  router.push({ name: 'source-overview', params: { source: newSource.key }, query: { view: view.value } })
}

function goToDetails(characterId: string | number): void {
  router.push({ path: `/${source.value}/details/${characterId}` })
}

watch(source, () => {
  fetchCharacters(page.value)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 px-20 py-10">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-100 mb-4">
        {{ title }} Characters Overview
      </h1>

      <section class="flex justify-between items-center">
        <ViewSwitcher :view="view" :set-view="setView" />
        <SourceSwitcher :source="source" :switch-source="switchSource" />
      </section>
    </header>

    <div v-if="isLoading" class="text-center text-gray-300">
      Loading...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else>
      <CharacterList v-if="view === 'list'" :characters="characters" @view-details="goToDetails" />
      <CharacterGrid v-else :characters="characters" @view-details="goToDetails" />
    </div>

    <section class="flex justify-between items-center mt-6">
      <button :disabled="page === 1" class="btn-outline px-4 py-2 rounded-lg" @click="fetchCharacters(page - 1)">
        Previous
      </button>
      <button :disabled="info?.count <= page * 20" class="btn-outline px-4 py-2 rounded-lg" @click="fetchCharacters(page + 1)">
        Next
      </button>
    </section>
  </div>
</template>

<style>
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200;
}

.btn-outline {
  @apply border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition duration-200;
}

.btn-outline:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
