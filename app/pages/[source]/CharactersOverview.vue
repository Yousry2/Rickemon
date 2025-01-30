<script lang="ts" setup>
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
const characterStore = useCharacterStore()
const { characters, info, isLoading, error } = characterStore

const { source, page, fetchCharacters } = useFetchCharacters()

const view = ref<string>((route.query.view as string) ?? VIEW_MODES[0]?.key)

const title = computed<string>(() => SOURCES.find(s => s.key === source.value)?.label || 'Characters')

function setView(newView: string): void {
  view.value = newView
  router.push({ name: 'source-CharactersOverview', params: { source: source.value }, query: { ...route.query, view: newView } })
}

function switchSource(newSource: string): void {
  if (SOURCES.some(s => s.key === newSource)) {
    router.push({ name: 'source-CharactersOverview', params: { source: newSource }, query: { ...route.query } })
  }
}

function goToDetails(characterId: string | number): void {
  router.push({ path: `/${source.value}/details/${characterId}` })
}

watch(() => route.query.view, (newView) => {
  view.value = (newView as string) ?? VIEW_MODES[0]?.key
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
      <CharacterList v-if="view === 'list'" :characters="characters" :go-to-details="goToDetails" />
      <CharacterGrid v-else :characters="characters" :go-to-details="goToDetails" />
    </div>

    <section class="flex justify-between items-center mt-6">
      <button :disabled="page !== 1" class="btn-outline px-4 py-2 rounded-lg" @click="fetchCharacters(page - 1)">
        Previous
      </button>
      <button :disabled="info?.count <= page * 20" class="btn-outline px-4 py-2 rounded-lg" @click="fetchCharacters(page + 1)">
        Next
      </button>
    </section>
  </div>
</template>
