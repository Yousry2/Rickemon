import { defineStore } from 'pinia'

export const useCharacterDetailsStore = defineStore('character-details', {
  state: () => ({
    characterDetails: null,
    isLoadingDetails: false,
    errorDetails: null as string | null, 
  }),
  actions: {
    async fetchPokemonDetails(idOrName: string | number): Promise<void> {
      this.isLoadingDetails = true
      this.errorDetails = null
      const config = useRuntimeConfig().public
      const url = config.pokemonApiUrl
      try {
        const response = await fetch(`${url}/pokemon/${idOrName}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokémon details (id/name: ${idOrName})`)
        }
        this.characterDetails = await response.json()
      }
      catch (err) {
        this.errorDetails = `Failed to load Pokémon details: ${(err as Error).message}`
      }
      finally {
        this.isLoadingDetails = false
      }
    },
    async fetchRickAndMortyDetails(id: number): Promise<void> {
      this.isLoadingDetails = true
      this.errorDetails = null
      const config = useRuntimeConfig().public
      const url = config.rickAndMortyApiUrl
      try {
        const response = await fetch(`${url}/character/${id}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch Rick & Morty character (id: ${id})`)
        }
        this.characterDetails = await response.json()
      }
      catch (err) {
        this.errorDetails = `Failed to load Rick & Morty character: ${(err as Error).message}`
      }
      finally {
        this.isLoadingDetails = false
      }
    },
  },
})
