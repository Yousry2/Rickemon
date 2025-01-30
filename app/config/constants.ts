export interface SourceOption {
    key: string
    label: string
  }
  
  export interface ViewOption {
    key: string
    label: string
  }
  
  export const SOURCES: SourceOption[] = [
    { key: 'rick', label: 'Rick and Morty' },
    { key: 'pokemon', label: 'Pokémon' },
  ]
  
  export const VIEW_MODES: ViewOption[] = [
    { key: 'list', label: 'List View' },
    { key: 'grid', label: 'Grid View' },
  ]
  