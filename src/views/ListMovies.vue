<script setup lang="ts">
/* import font awesome icon component */
import { Movie } from "@/dto/Movie";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { RouterLink } from "vue-router";

const store = useCounterStore();
const showWatched = ref(true);
const selected = ref(null);

const moviesDisplay = computed(() => {
  return [...store.movies]
    .filter((movie) => showWatched.value || !movie.watched)
    .sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
});

function selectMovie(id: string) {
  selected.value = id;
}

function isSelected(id: string) {
  return selected.value == id;
}

function markAsWatched(movie: Movie) {
  store.updateWatched(movie.tmdbRef, !movie.watched);
  selected.value = null;
}
function deleteMovie(id: string) {
  store.removeMovie(id);
}
</script>

<template>
  <div class="d-flex flex-row justify-content-between bd-highlight text-white">
    <h3>List Movies</h3>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        v-model="showWatched"
      />
      <label class="form-check-label text-white" for="flexSwitchCheckDefault"
        >Include Watched</label
      >
    </div>
  </div>

  <div class="list-container">
    <div v-if="moviesDisplay.length" class="list-group">
      <button
        type="button"
        class="list-group-item list-group-item-action d-flex"
        :class="{ active: isSelected(movie.tmdbRef) }"
        v-for="movie in moviesDisplay"
        :key="movie.tmdbRef"
        @click="selectMovie(movie.tmdbRef)"
      >
        <span class="me-auto">
          {{ movie.name }}
        </span>
        <font-awesome-icon
          v-if="movie.watched"
          class="icon text-primary me-2"
          icon="fa-solid fa-eye"
        />

        <div v-if="isSelected(movie.tmdbRef)">
          <font-awesome-icon
            class="icon text-light me-2"
            icon="fa-solid fa-eye"
            @click.stop="markAsWatched(movie)"
          />
          <font-awesome-icon
            class="icon text-danger"
            icon="fa-solid fa-trash"
            @click.stop="deleteMovie(movie.tmdbRef)"
          />
        </div>
      </button>
    </div>
    <div v-else class="mt-2 text-center">
      <p class="text-white">Nothing to see here</p>
      <RouterLink class="m-2 btn btn-primary" variant="primary" to="AddMovie"
        >Add Movies</RouterLink
      >
    </div>
  </div>
</template>
<style scoped type="scss">
.icon {
  font-size: 1.5rem;
}
</style>
