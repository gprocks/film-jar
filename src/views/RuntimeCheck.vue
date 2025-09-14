<script setup lang="ts">
import { SearchType } from "@/dto/TMDBSearch";
import { MovieDetail, TmdbSearch } from "@/components";
import { ref } from "vue";
import { getMedia } from "@/services/tmdbService";
import { Helper, ITMDBMovieDetail } from "@/dto";

const loading = ref(false);
let selectedFilm = ref<ITMDBMovieDetail>(null);

function selectFilm(result) {
  loading.value = true;
  getMedia(result.id).then((data) => {
    selectedFilm.value = data;
  });
}
</script>

<template>
  <h3>Check Runtime</h3>
  <tmdb-search
    :searchType="SearchType.Movies"
    placeholderText="Search"
    action-icon="fa-eye"
    @media-selected="selectFilm"
  />
  <div class="text-center" v-if="selectedFilm">
    <h1 class="movie-title">
      <span>{{ selectedFilm.title }}</span>
    </h1>
    <MovieDetail :movie-detail="selectedFilm" :hide-detail="false" />
  </div>
</template>
<style scoped type="scss"></style>
