<script lang="ts" setup>
import { useCharacterStore } from '@/stores/characters'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type Source = 'rick' | 'pokemon'
type View = 'list' | 'grid'

interface RouteParams {
  source: Source
}

interface QueryParams {
  view?: View
}

const route = useRoute()
const router = useRouter()
const params = route.params as RouteParams
const query = route.query as QueryParams

const source = ref<Source>(params.source)
const view = ref<View>(query.view || 'list')
const page = ref<number>(Number.parseInt(query.page as string) || 1)

const characterStore = useCharacterStore()
const { characters, info, isLoading, error } = characterStore

const title = computed(() => (source.value === 'pokemon' ? 'Pokémon' : 'Rick and Morty'))

async function fetchCharacters(pageNumber: number) {
  page.value = pageNumber
  if (source.value === 'rick') {
    await characterStore.fetchRickAndMortyCharacters(pageNumber)
  }
  else if (source.value === 'pokemon') {
    const offset = (pageNumber - 1) * 20
    await characterStore.fetchPokemonCharacters(offset)
  }
}

function setView(newView: View) {
  view.value = newView
  router.push({
    name: 'source-overview',
    params: { source: source.value },
    query: { ...route.query, view: newView },
  })
}

function switchSource(newSource: Source) {
  source.value = newSource
  router.push({
    name: 'source-overview',
    params: { source: newSource },
    query: { ...route.query, },
  })
}

function goToDetails(characterId: string | number) {
  router.push({
    path: `/${source.value}/details/${characterId}`,
  })
}

watch(() => route.params.source, (newSource) => {
  source.value = newSource as Source
  fetchCharacters(page.value)
})


watch(() => route.query.view, (newView) => {
  view.value = newView as View || 'grid'
})

onMounted(() => {
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
        <div>
          <button
            :class="view === 'list' ? 'btn-primary' : 'btn-outline'"
            class="rounded-lg px-4 py-2 mr-2"
            @click="setView('list')"
          >
            List View
          </button>
          <button
            :class="view === 'grid' ? 'btn-primary' : 'btn-outline'"
            class="rounded-lg px-4 py-2"
            @click="setView('grid')"
          >
            Grid View
          </button>
        </div>
        <div>
          <button
            :class="source === 'rick' ? 'btn-primary' : 'btn-outline'"
            class="rounded-lg px-4 py-2 mr-2"
            @click="switchSource('rick')"
          >
            Rick and Morty
          </button>
          <button
            :class="source === 'pokemon' ? 'btn-primary' : 'btn-outline'"
            class="rounded-lg px-4 py-2"
            @click="switchSource('pokemon')"
          >
            Pokémon
          </button>
        </div>
      </section>
    </header>

    <div v-if="isLoading" class="text-center text-gray-300">
      Loading...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else>
      <section v-if="view === 'list'" class="space-y-4">
        <ListCard
          v-for="character in characters"
          :key="character.id || character.name"
          :character="character"
          @view-details="goToDetails"
        />
      </section>

      <section v-if="view === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <GridCard
          v-for="character in characters"
          :key="character.id || character.name"
          :character="character"
          @view-details="goToDetails"
        />
      </section>
    </div>

    <section class="flex justify-between items-center mt-6">
      <button
        :disabled="page !== 1"
        class="btn-outline px-4 py-2 rounded-lg"
        @click="fetchCharacters(page - 1)"
      >
        Previous
      </button>
      <button
        :disabled="info?.count <= page * 20"
        class="btn-outline px-4 py-2 rounded-lg"
        @click="fetchCharacters(page + 1)"
      >
        Next
      </button>
    </section>
  </div>
</template>

<style scoped>
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
