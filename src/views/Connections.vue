<script setup lang="ts">
import { computed, ref } from "vue";
import { MediaType, SearchType } from "@/dto/TMDBSearch";
import { TmdbSearch } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getMedia } from "@/services/tmdbService";

const selectedMedia = ref([]);
const selectedIds = computed(() => {
  return selectedMedia.value.map((x) => x.id);
});
const matchingPeople = computed(() => {
  if (selectedMedia.value.length > 1) {
    return GetMatches();
  } else return [];
});

function GetMatches() {
  let index = 0;
  let matches = selectedMedia.value[0].credits.cast;
  while (index < selectedMedia.value.length - 1) {
    matches = matches.filter((castMember) => {
      return selectedMedia.value[index + 1].credits.cast.some(
        (x) => x.id === castMember.id,
      );
    });
    index++;
  }
  return matches;
}

function triggerAction(result) {
  let mediaType = result.media_type === "tv" ? MediaType.TV : MediaType.Movie;
  getMedia(result.id, mediaType, true).then((resp) => {
    selectedMedia.value.push(resp);
  });
}

function removeItem(mediaItem) {
  const index = selectedMedia.value.findIndex((x) => x.id === mediaItem.id);
  if (index > -1) {
    // only splice array when item is found
    selectedMedia.value.splice(index, 1); // 2nd parameter means remove one item only
  }
}
</script>

<template>
  <h3>Find Connections</h3>
  <tmdb-search
    @mediaSelected="triggerAction"
    :disableList="selectedIds"
    :searchType="SearchType.All"
    placeholderText="Search"
  >
    <div class="mb-3">
      <span
        :key="`div_media_${media.id}`"
        v-for="media in selectedMedia"
        class="badge rounded-pill text-bg-success me-2 fs-6"
      >
        {{ media.name || media.title }}
        <font-awesome-icon
          @click="removeItem(media)"
          :icon="['fas', 'circle-xmark']"
        />
      </span></div
  ></tmdb-search>
  <div v-if="matchingPeople.length">
    <div class="list-group search-results">
      <div
        :key="`div_match_${match.id}`"
        v-for="match in matchingPeople"
        class="list-group-item list-group-item-action"
        aria-current="true"
      >
        <div class="d-flex">
          <div class="flex-shrink-0">
            <a
              class="item"
              :href="`https://www.themoviedb.org/person/${match.id}`"
              target="_blank"
            >
              <img
                v-if="match.profile_path"
                :src="`https://image.tmdb.org/t/p/w92${match.profile_path}`"
                alt="movie image"
                onerror="../assets/placeholder.jpg"
              />
              <img v-else src="../assets/placeholder.jpg" />
            </a>
          </div>
          <div class="flex-grow-1 ms-3">
            <div class="d-flex flex-column bd-highlight mb-3 result-content">
              <div class="">{{ match.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped type="scss"></style>
