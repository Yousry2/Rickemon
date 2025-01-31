export type SwitchOption<T> = {
  key: string
  label: string
} & T

// idealy we would have a type for each source, but for now we will just use object
export type SourceOption = object;

export type ViewOption = object;

export const SOURCES: SwitchOption<SourceOption>[] = [
  { key: 'rick', label: 'Rick and Morty' },
  { key: 'pokemon', label: 'Pokémon' },
]

export const VIEW_MODES: SwitchOption<ViewOption>[] = [
  { key: 'list', label: 'List View' },
  { key: 'grid', label: 'Grid View' },
]
