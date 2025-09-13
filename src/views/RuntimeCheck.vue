<script setup lang="ts">
import { SearchType } from "@/dto/TMDBSearch";
import { TmdbSearch } from "@/components";
import { ref } from "vue";
import { getMedia } from "@/services/tmdbService";

const loading = ref(false);
let selectedFilm = ref<{
  title: string;
  runtime: number;
  poster_path: string;
  overview: string;
}>(null);

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
    ><div class="text-center" v-if="selectedFilm">
      <div class="text-white">{{ selectedFilm.title }}</div>
      <div>
        <img
          v-if="selectedFilm.poster_path"
          :src="`https://image.tmdb.org/t/p/w185${selectedFilm.poster_path}`"
          alt="movie image"
        />
        <img v-else src="../assets/placeholder.jpg" />
      </div>
      <div class="text-white">
        {{ Math.floor(selectedFilm.runtime / 60) }}:{{
          (selectedFilm.runtime % 60).toString().padStart(2, "0")
        }}
      </div>
      <div class="text-white">{{ selectedFilm.overview }}</div>
    </div></tmdb-search
  >
</template>
<style scoped type="scss"></style>
