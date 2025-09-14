<script setup lang="ts">
import { ref, watch } from "vue";

import { Loader } from "@/components";
import { getProviders } from "@/services/tmdbService";
import { Helper, ITMDBMovieDetail } from "@/dto";

export interface Props {
  hideDetail: boolean;
  movieDetail: ITMDBMovieDetail;
}

const props = withDefaults(defineProps<Props>(), {
  hideDetail: true,
  movieDetail: null,
});

const loading = ref(true);
const streamers = ref([]);

watch(
  () => props.hideDetail,
  (val) => {
    if (val === false) {
      setTimeout(() => {
        showMovieDetail.value = true;
      }, 2500);
    }
  },
);

const showMovieDetail = ref(!props.hideDetail);
function init() {
  getProviders(props.movieDetail.id).then((x) => {
    streamers.value = x["flatrate"];
  });
}

init();
</script>

<template>
  <div class="text-center">
    <div class="mb-2" v-if="showMovieDetail">
      <img
        v-if="movieDetail.poster_path"
        :src="`https://image.tmdb.org/t/p/w185${movieDetail.poster_path}`"
        alt="movie image"
      />
      <img v-else src="../assets/placeholder.jpg" />
    </div>
    <div>
      <h2>
        Run Time: <b>{{ Helper.formatTime(movieDetail.runtime) }}</b>
      </h2>
      <div class="mb-3">
        <span
          :key="`div_genre_${genre.name}`"
          v-for="genre in movieDetail.genres"
          class="badge rounded-pill text-bg-success me-2 fs-6"
        >
          {{ genre.name }}
        </span>
      </div>
      <div class="text-white pb-3" v-if="showMovieDetail">
        <span v-for="(st, index) in streamers" :key="`sp_streamer_${index}`">
          <img
            v-if="movieDetail.poster_path"
            :src="`https://image.tmdb.org/t/p/w45${st.logo_path}`"
            alt="movie image"
            class="streamer me-2"
        /></span>
      </div>
      <div v-if="showMovieDetail" class="text-white me-2">
        {{ movieDetail.overview }}
      </div>
    </div>
  </div>
</template>
<style scoped type="scss">
.streamer {
  clip-path: circle();
}
</style>
