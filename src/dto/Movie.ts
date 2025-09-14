export interface IMovie {
  tmdbRef: number;
  name: string;
  watched: boolean;
}

export class Movie implements IMovie {
  tmdbRef: number;
  name: string;
  watched: boolean;

  constructor() {
    this.tmdbRef = null;
    this.name = "";
    this.watched = false;
  }
}
