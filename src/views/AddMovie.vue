<script setup lang="ts">
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { toast } from 'vue3-toastify'

import { useCounterStore } from '@/stores/counter'
import { Loader } from '@/components'
import { searchMovies } from '@/services/tmdbService'

const loading = ref(false)
const paging = ref(false)
const hasSearched = ref(false)
const searchTerm = ref('')
const currentSearch = ref('')
const searchResult = ref({ results: [], page: 0, total_pages: 0 })
const invalidSearch = computed(() => {
  return hasSearched.value && searchTerm.value.length < 2
})
const store = useCounterStore()
function search() {
  hasSearched.value = true
  currentSearch.value = searchTerm.value
  loading.value = true
  searchMovies(searchTerm.value).then((res) => {
    searchResult.value = res
    loading.value = false
  })
}
function nextPage() {
  paging.value = true
  searchMovies(currentSearch.value, searchResult.value.page + 1).then((res) => {
    searchResult.value.page = res.page
    searchResult.value.total_pages = res.total_pages
    searchResult.value.results.push(...res.results)
    paging.value = false
  })
}

function triggerAction(result) {
  console.log(result.title, result.id)
  store.addMovie({ name: result.title, tmdbRef: result.id, watched: false })
  toast('Added to the jar', {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER
  })
}

function isAdded(id) {
  console.log(store.movies, store.selectedIds)
  return store.selectedIds.includes(id)
}
</script>

<template>
  <h3>Add Movie</h3>
  <form @submit.prevent="search">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': invalidSearch }"
        placeholder="Movie Title"
        aria-label="Movie Title"
        aria-describedby="Movie Title"
        v-model="searchTerm"
      />
      <button class="btn btn-success btn-appendage" type="submit" id="btn-search">
        <font-awesome-icon class="fa" icon="fa-solid fa-search" />
      </button>
      <div class="invalid-feedback">You need to search for something!</div>
    </div>
  </form>
  <loader v-if="loading"></loader>

  <div class="results" v-else>
    <div v-if="hasSearched">
      <div v-if="searchResult.results.length">
        <div class="list-group search-results">
          <div
            v-for="result in searchResult.results"
            :key="`div_${result.id}`"
            class="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 title">{{ result.title }}</h5>
              <button
                v-if="!isAdded(result.id)"
                class="btn action-btn"
                @click="triggerAction(result)"
              >
                <font-awesome-icon
                  class="fa-2x text-primary action-icon"
                  icon="fa-solid fa-circle-plus"
                />
              </button>
              <font-awesome-icon
                v-else
                class="fa-2x text-primary action-icon text-success"
                icon="fa-solid fa-circle-check"
              />
            </div>
            <div class="d-flex">
              <div class="flex-shrink-0">
                <a
                  class="item"
                  :href="`https://www.themoviedb.org/movie/${result.id}`"
                  target="_blank"
                >
                  <img
                    v-if="result.poster_path"
                    :src="`https://image.tmdb.org/t/p/w92${result.poster_path}`"
                    alt="movie image"
                    onerror="../assets/placeholder.jpg"
                  />
                  <img v-else src="../assets/placeholder.jpg" />
                </a>
              </div>
              <div class="flex-grow-1 ms-3">
                <div class="d-flex flex-column bd-highlight mb-3 result-content">
                  <div class="">{{ result.overview }}</div>
                  <div class="mt-auto align-self-end text-muted">{{ result.release_date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-grid gap-2 mt-2"
          v-if="searchResult.total_pages > 1 && searchResult.page < searchResult.total_pages"
        >
          <button class="btn btn-primary" type="button" @click="nextPage" :disabled="paging">
            Show More
          </button>
        </div>
      </div>
      <div v-else>
        <p>Nope, nothing to see here</p>
      </div>
    </div>
  </div>
</template>
<style scoped type="scss">
.search-results {
  color: #000;
  .title {
    color: #000;
  }
}
.btn-appendage {
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}
p {
  color: white;
}
.result-content {
  height: 100%;
}

.item {
  position: relative;
  display: inline-block;
}
.notify-badge {
  --bs-badge-padding-y: 0.35em;
  --bs-badge-font-size: 0.75em;

  position: absolute;
  padding: var(0.35em) var(0.65em);
  text-align: center;
  border-radius: 30px 30px 30px 30px;
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
}
.action-btn {
  margin: 0px;
  padding: 0px;
}
</style>
