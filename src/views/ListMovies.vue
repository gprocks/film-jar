<script setup lang="ts">
/* import font awesome icon component */
import { Movie } from '@/dto/Movie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
const selected = ref(null)

function selectMovie(id: string) {
  console.log(id)
  selected.value = id
}

function isSelected(id: string) {
  return selected.value == id
}

function markAsWatched(movie: Movie) {
  store.updateWatched(movie.tmdbRef, !movie.watched)
  selected.value = null
}
function deleteMovie(id: string) {
  console.log(id)
  store.removeMovie(id)
}
</script>

<template>
  <div class="list-container">
    <h3>List Movies</h3>

    <div class="list-group">
      <button
        type="button"
        class="list-group-item list-group-item-action d-flex"
        :class="{ active: isSelected(movie.tmdbRef) }"
        v-for="movie in store.movies"
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
  </div>
</template>
<style scoped type="scss">
.icon {
  font-size: 1.5rem;
}
</style>
