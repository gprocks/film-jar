import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Movie } from "@/dto/Movie";

export const useCounterStore = defineStore("counter", () => {
  const movies = useLocalStorage<Movie[]>("movies", []);

  function addMovie(movie: Movie) {
    movies.value.push(movie);
  }
  function removeMovie(id: string) {
    const index = movies.value.findIndex((x) => x.tmdbRef === id);
    if (index > -1) {
      movies.value.splice(index, 1);
    }
  }
  function updateWatched(id: string, val: boolean) {
    const movie = movies.value.find((x) => x.tmdbRef === id);
    movie.watched = val;
  }
  const selectedIds = computed(() => movies.value.map((x) => x.tmdbRef));
  return { movies, selectedIds, addMovie, removeMovie, updateWatched };
});
