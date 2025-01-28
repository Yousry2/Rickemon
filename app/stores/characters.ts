interface Character {
  id?: number
  name: string
  status?: string
  species?: string
  image?: string
  url?: string
}

interface CharacterState {
  characters: Character[]
  isLoading: boolean
  error: string | null
}
