export class Character {
  id: number | string
  name: string
  image?: string
  status?: string
  species?: string
  origin?: { name: string }
  gender: any

  constructor(id: number | string, name: string, image?: string, status?: string, species?: string) {
    this.id = id
    this.name = name
    this.image = image
    this.status = status
    this.species = species
  }
}
