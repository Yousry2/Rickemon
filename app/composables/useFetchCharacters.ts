import { SOURCES } from '@/config/constants'

import { useCharacterStore } from '@/stores/characters'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useFetchCharacters() {
  const route = useRoute()
  const characterStore = useCharacterStore()

  const source = ref<string>(route.params.source as string)
  const page = ref<number>(Number.parseInt(route.query.page as string) || 1)

  async function fetchCharacters(pageNumber: number): Promise<void> {
    page.value = pageNumber

    switch (source.value) {
      case 'rick':
        await characterStore.fetchRickAndMortyCharacters(pageNumber)
        break
      case 'pokemon':
      { const offset = (pageNumber - 1) * 20
        await characterStore.fetchPokemonCharacters(offset)
        break }
      default:
        console.warn(`Source "${source.value}" is not supported.`)
    }
  }

  watch(() => route.params.source, (newSource: string | undefined) => {
    if (newSource && SOURCES.some(s => s.key === newSource)) {
      source.value = newSource
      fetchCharacters(page.value)
    }
  })

  onMounted(() => fetchCharacters(page.value))

  return { source, page, fetchCharacters }
}
