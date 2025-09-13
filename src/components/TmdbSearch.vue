<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { Loader } from "@/components";
import { searchMovies, searchMulti } from "@/services/tmdbService";
import { SearchType } from "@/dto/TMDBSearch";

export interface Props {
  searchType?: SearchType;
  disableList?: string[];
  placeholderText?: string;
  actionIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchType: SearchType.Movies,
  disableList: () => [],
  placeholderText: "Movie Title",
  actionIcon: "fa-circle-plus",
});

const loading = ref(false);
const paging = ref(false);
const hasSearched = ref(false);
const searchTerm = ref("");
const currentSearch = ref("");
const searchResult = ref({ results: [], page: 0, total_pages: 0 });
const invalidSearch = computed(() => {
  return hasSearched.value && searchTerm.value.length < 2;
});

const showScrollHome = ref(false);
const emit = defineEmits(["mediaSelected"]);

function init() {
  loading.value = false;
  paging.value = false;
  hasSearched.value = false;
  searchTerm.value = "";
  currentSearch.value = "";
  searchResult.value = { results: [], page: 0, total_pages: 0 };
}

function search() {
  hasSearched.value = true;
  if (searchTerm.value) {
    currentSearch.value = searchTerm.value;
    loading.value = true;
    getResults().then((res) => {
      searchResult.value = res;
      loading.value = false;
    });
  }
}
function nextPage() {
  paging.value = true;
  getResults(searchResult.value.page + 1).then((res) => {
    searchResult.value.page = res.page;
    searchResult.value.total_pages = res.total_pages;
    searchResult.value.results.push(...res.results);
    paging.value = false;
  });
}

function getResults(page = 1) {
  return props.searchType === SearchType.All
    ? searchMulti(currentSearch.value, page)
    : searchMovies(currentSearch.value, page);
}

function triggerAction(result) {
  init();
  emit("mediaSelected", result);
}

function isAdded(id) {
  return props.disableList.includes(id);
}

function handleScroll() {
  if (window.scrollY > 0) {
    showScrollHome.value = true;
  } else {
    showScrollHome.value = false;
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <form @submit.prevent="search">
    <div class="input-group mb-3">
      <input
        type="search"
        class="form-control"
        :class="{ 'is-invalid': invalidSearch }"
        :placeholder="$props.placeholderText"
        aria-label="Movie Title"
        aria-describedby="Movie Title"
        v-model="searchTerm"
      />
      <button
        class="btn btn-success btn-appendage"
        type="submit"
        id="btn-search"
      >
        <font-awesome-icon class="fa" icon="fa-solid fa-search" />
      </button>
      <div class="invalid-feedback">You need to search for something!</div>
    </div>
  </form>
  <slot></slot>
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
                  :icon="`fa-solid ${actionIcon}`"
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
                  :href="`https://www.themoviedb.org/${
                    result.media_type || 'movie'
                  }/${result.id}`"
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
                <div
                  class="d-flex flex-column bd-highlight mb-3 result-content"
                >
                  <div class="">{{ result.overview }}</div>
                  <div class="mt-auto align-self-end text-muted">
                    {{ result.release_date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-grid gap-2 mt-2"
          v-if="
            searchResult.total_pages > 1 &&
            searchResult.page < searchResult.total_pages
          "
        >
          <button
            class="btn btn-primary"
            type="button"
            @click="nextPage"
            :disabled="paging"
          >
            Show More
          </button>
        </div>
        <!-- Back to top button -->
      </div>
      <div v-else>
        <p>Nope, nothing to see here</p>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="btn btn-danger btn-floating btn-lg"
    :class="showScrollHome ? 'show' : 'hide'"
    id="btn-back-to-top"
    @click="scrollToTop"
  >
    <font-awesome-icon class="fa" icon="fa-solid fa-arrow-up" />
  </button>
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

.btn-floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  transition:
    visibility 0s linear 0.33s,
    opacity 0.33s linear;

  &:hover {
    box-shadow: var(
      0 8px 9px -4px rgba(220, 76, 100, 0.3),
      0 4px 18px 0 rgba(220, 76, 100, 0.2)
    );
  }
}
.hide {
  visibility: hidden;
  opacity: 0;
}
.show {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}
</style>
