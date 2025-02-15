import { MediaType } from "@/dto/TMDBSearch";

const routeUrl = "https://api.themoviedb.org/3/";
const apikey = "18474e059b6e87b5879d7626353cb23b";
function searchMovies(title: string, page: number = 1): Promise<any> {
  return fetch(
    `${routeUrl}search/movie?api_key=${apikey}&query=${encodeURIComponent(
      title,
    )}&page=${page}`,
  ).then((resp) => {
    return resp.json();
  });
}
function searchMulti(title: string, page: number = 1) {
  return fetch(
    `${routeUrl}search/multi?api_key=${apikey}&query=${encodeURIComponent(
      title,
    )}&page=${page}`,
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.results = data.results.filter((x) =>
        ["tv", "movie"].includes(x.media_type),
      );
      return data;
    });
}
function getMedia(
  media_id: string,
  type: MediaType = MediaType.Movie,
  includeCredits = false,
): Promise<any> {
  let route = `${routeUrl}${type}/${media_id}?api_key=${apikey}`;
  if (includeCredits) {
    route += "&append_to_response=aggregate_credits,credits";
  }
  return fetch(route)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (data.aggregate_credits) {
        data.credits = data.aggregate_credits;
      }
      return data;
    });
}

export { searchMovies, getMedia, searchMulti };
