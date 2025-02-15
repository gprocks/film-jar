import { Movie } from "./Movie";

export interface IJar {
  id: string;
  name: string;
  contents: Movie[];
}

export class Jar implements IJar {
  id: string;
  name: string;
  contents: Movie[];

  constructor() {
    this.id = "";
    this.name = "";
    this.contents = [];
  }
}
