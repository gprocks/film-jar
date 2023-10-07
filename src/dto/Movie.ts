export interface IMovie {
  tmdbRef: string
  name: string
  watched: boolean
}

export class Movie implements IMovie {
  tmdbRef: string
  name: string
  watched: boolean

  constructor() {
    this.tmdbRef = ''
    this.name = ''
    this.watched = false
  }
}
