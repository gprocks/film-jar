<script setup lang="ts">
/* import font awesome icon component */
import { Loader, MovieDetail } from "@/components";
import { Movie } from "@/dto/Movie";
import { useJarStore } from "@/stores/jarStore";
import { computed, ref, watch } from "vue";
import { getMedia } from "@/services/tmdbService";

const store = useJarStore();
const loading = ref(true);
const selectedMovieId = ref<number>(null);
const movieDetails = ref(null);
const showDetail = ref(false);

watch(selectedMovieId, (val) => {
  loading.value = true;
  getMedia(val).then((resp) => {
    movieDetails.value = resp;
    loading.value = false;
  });
});
const canPickAnother = computed<boolean>(() => {
  return (
    unwatchedList.value.length > 1 ||
    (movie.value.watched && unwatchedList.value.length > 0)
  );
});
const unwatchedList = computed<Movie[]>(() => {
  return store.movies.filter((movie) => !movie.watched);
});
const movie = computed<Movie>(() => {
  return store.movies.find((movie) => movie.tmdbRef === selectedMovieId.value);
});

watch(
  unwatchedList,
  (newValue) => {
    if (selectedMovieId.value === null && newValue.length) {
      pickMovie();
    }
  },
  { immediate: true },
);

function watchMovie() {
  store.updateWatched(movie.value.tmdbRef, true);
  showDetail.value = true;
}

function returnMovie() {
  store.updateWatched(movie.value.tmdbRef, false);
  pickMovie();
}
function pickMovie() {
  showDetail.value = false;
  if (unwatchedList.value.length > 1) {
    const moviesToChoose = unwatchedList.value.filter(
      (movie) => movie.tmdbRef !== selectedMovieId.value,
    );
    const index = Math.floor(Math.random() * moviesToChoose.length);
    selectedMovieId.value = moviesToChoose[index].tmdbRef;
  } else {
    selectedMovieId.value = unwatchedList.value[0].tmdbRef;
  }
}
</script>

<template>
  <div
    v-if="!unwatchedList.length && selectedMovieId === null"
    class="mt-2 text-center"
  >
    <p class="text-large text-white">There are no movies left in the jar</p>
    <RouterLink class="m-2 btn btn-primary" variant="primary" to="AddMovie"
      >Add some</RouterLink
    >
  </div>
  <div v-else>
    <Loader v-if="loading"></Loader>
    <div v-else>
      <h3 class="mb-3">Pick a Movie</h3>
      <div>
        <Loader v-if="loading" />
        <div class="text-center" v-else>
          <h1 v-if="movie.watched" class="movie-title">
            <span>{{ movieDetails.title }}</span>
          </h1>
          <h1 v-else class="movie-placeholder">No Peeking</h1>
          <MovieDetail
            :movie-detail="movieDetails"
            :hide-detail="!showDetail"
          />
        </div>

        <div class="text-center">
          <button
            variant="success"
            size="lg"
            :disabled="movie.watched"
            class="m-3 btn btn-success"
            @click="watchMovie()"
          >
            Watch It
          </button>
          <button
            variant="primary"
            size="lg"
            :disabled="!canPickAnother"
            class="m-3 btn btn-outline-success"
            @click="pickMovie()"
          >
            Pick Another
          </button>
          <button
            v-if="movie.watched"
            variant="primary"
            size="lg"
            class="m-3 btn btn-outline-success"
            @click="returnMovie()"
          >
            Not Today
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="scss" scoped>
.movie-placeholder {
  color: #222;
}

h1 {
  font-size: 3em;
  font-weight: normal;
}

.movie-title span {
  position: relative;
  overflow: hidden;
  display: block;
  line-height: 1.2;
}

.movie-title span::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  animation: a-ltr-after 2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  transform: translateX(-101%);
}

.movie-title span::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #222;
  animation: a-ltr-before 2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  transform: translateX(0);
}

.movie-title span:nth-of-type(1)::before,
.movie-title span:nth-of-type(1)::after {
  animation-delay: 1s;
}

.movie-title span:nth-of-type(2)::before,
.movie-title span:nth-of-type(2)::after {
  animation-delay: 1.5s;
}

@keyframes a-ltr-after {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(101%);
  }
}

@keyframes a-ltr-before {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
