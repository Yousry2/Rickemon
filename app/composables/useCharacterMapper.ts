export interface PokemonDetails {
  name: string
  base_experience: number
  height: number
  weight: number
  abilities: { ability: { name: string } }[]
  sprites?: { front_default: string }
}

export interface RickAndMortyDetails {
  name: string
  status: string
  species: string
  gender: string
  origin: { name: string }
  location: { name: string }
  image: string
}

export interface MappedDetail {
  label: string
  value: string | number | null | undefined
}

export function useCharacterMapper() {
  function mapCharacterDetails(
    characterDetails: PokemonDetails | RickAndMortyDetails | null,
    source: 'pokemon' | 'rick',
  ): MappedDetail[] {
    if (!characterDetails)
      return []

    if (source === 'pokemon') {
      const pokemon = characterDetails as PokemonDetails
      return [
        { label: 'Name', value: pokemon.name },
        { label: 'Base Experience', value: pokemon.base_experience },
        { label: 'Height', value: `${pokemon.height} m` },
        { label: 'Weight', value: `${pokemon.weight} kg` },
        { label: 'Abilities', value: pokemon.abilities.map(a => a.ability.name).join(', ') },
        { label: 'Image', value: pokemon.sprites?.front_default },
      ]
    }

    if (source === 'rick') {
      const rick = characterDetails as RickAndMortyDetails
      return [
        { label: 'Name', value: rick.name },
        { label: 'Status', value: rick.status },
        { label: 'Species', value: rick.species },
        { label: 'Gender', value: rick.gender },
        { label: 'Origin', value: rick.origin?.name },
        { label: 'Location', value: rick.location?.name },
        { label: 'Image', value: rick.image },
      ]
    }

    return []
  }

  return { mapCharacterDetails }
}
