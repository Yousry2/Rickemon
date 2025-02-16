import type { Character } from '~/models/character'
import { api } from '#app'
import { defineStore } from 'pinia'

interface PaginationInfo {
  count?: number
  pages?: number
  next?: string | null
  prev?: string | null
}

interface CharacterState {
  characters: Character[]
  info: PaginationInfo
  isLoading: boolean
  error: string | null
}

export const useCharacterStore = defineStore('characterStore', {
  state: (): CharacterState => ({
    characters: [],
    info: {},
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchRickAndMortyCharacters(page: number = 1): Promise<void> {
      this.isLoading = true
      this.error = null
      const config = useRuntimeConfig().public.apiParty.endpoints
      const url = config.rickAndMorty.url
      try {
        const response = await fetch(
          `${url}/character?page=${page}`,
        )
        const data = await response.json()
        this.characters = data.results
        this.info = data.info
      }
      catch {
        this.error = 'Failed to load Rick and Morty characters.'
      }
      finally {
        this.isLoading = false
      }
    },

    async fetchPokemonCharacters(offset: number = 0): Promise<void> {
      this.isLoading = true
      this.error = null
      const config = useRuntimeConfig().public.apiParty.endpoints
      const url = config.pokemon.url
      try {
        const response = await fetch(
          `${url}/pokemon?offset=${offset}&limit=20`,
        )

        //just a hack to retrieve dummy images 
        const data = await response.json()
        this.characters = data.results.map((item: { name: string, url: string }) => ({
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            item.url.split('/').slice(-2, -1)[0]
          }.png`,
        }))
        this.info = data.info
      }
      
      catch {
        this.error = 'Failed to load Pokémon characters.'
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
