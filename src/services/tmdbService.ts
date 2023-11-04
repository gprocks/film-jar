const routeUrl = "https://api.themoviedb.org/3/";
const apikey = "18474e059b6e87b5879d7626353cb23b";
function searchMovies(title: string, page: number = 1): Promise<any> {
  return fetch(
    `${routeUrl}/search/movie?api_key=${apikey}&query=${encodeURIComponent(
      title,
    )}&page=${page}`,
  ).then((resp) => {
    return resp.json();
  });
}
function getMovie(movie_id: string): Promise<any> {
  return fetch(`${routeUrl}movie/${movie_id}?api_key=${apikey}`).then(
    (resp) => {
      return resp.json();
    },
  );
}

export { searchMovies, getMovie };
