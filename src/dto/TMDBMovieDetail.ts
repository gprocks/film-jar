export interface ITMDBMovieDetail {
  id: number;
  title: string;
  runtime: number;
  poster_path: string;
  overview: string;
  genres: TMDBGenre[];
}

interface TMDBGenre {
  id: number;
  name: string;
}
