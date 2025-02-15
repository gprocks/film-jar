<script setup lang="ts">
/* import font awesome icon component */
import { Movie } from "@/dto/Movie";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref } from "vue";
import { useJarStore } from "@/stores/jarStore";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

export interface Props {
  jarid: string;
}

const props = withDefaults(defineProps<Props>(), {
  jarid: null,
});

const router = useRouter();
const store = useJarStore();
const showWatched = ref(true);
const selected = ref(null);
const sideBarActive = ref(false);
const htmlsidebarelement = ref(null);

const editNameIsVisible = ref(false);
const editJarName = ref("");

const deleteConfirmationIsVisible = ref(false);

const selectedJar = computed(() => store.jarConfig[props.jarid]);

const isSelectedJar = computed(() => props.jarid === store.activeJarId);

const moviesDisplay = computed(() => {
  return [...selectedJar.value.contents]
    .filter((movie) => showWatched.value || !movie.watched)
    .sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
});

onClickOutside(htmlsidebarelement, () => {
  sideBarActive.value = false;
});

function selectMovie(id: string) {
  selected.value = id;
}

function isSelected(id: string) {
  return selected.value == id;
}

function markAsWatched(movie: Movie) {
  store.updateWatched(movie.tmdbRef, !movie.watched, props.jarid);
  selected.value = null;
}
function deleteMovie(id: string) {
  store.removeMovie(id, props.jarid);
}

function showSidebar() {
  editNameIsVisible.value = false;
  deleteConfirmationIsVisible.value = false;
  sideBarActive.value = true;
}

function setAsActive() {
  store.setActiveJar(props.jarid);
  toast(`${selectedJar.value.name} is now the active jar`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
}

function showEditJarName() {
  editJarName.value = selectedJar.value.name;
  editNameIsVisible.value = true;
}

function updateJarName() {
  selectedJar.value.name = editJarName.value;
  editNameIsVisible.value = false;
}

function deleteJar() {
  store.deleteJar(props.jarid);
  toast(`$Jar removed`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
  router.push({ name: "jarsConfig" });
}
</script>

<template>
  <div
    ref="htmlsidebarelement"
    v-if="sideBarActive"
    class="offcanvas offcanvas-end show text-bg-dark"
    tabindex="-1"
    id="offcanvasDark"
    aria-labelledby="offcanvasDarkLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasDarkLabel">Options</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        aria-label="Close"
        @click="sideBarActive = false"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-grid gap-2">
        <div v-if="!editNameIsVisible">
          <span>{{ selectedJar.name }}</span>
          <button class="btn btn btn-dark" @click="showEditJarName">
            <font-awesome-icon :icon="['fas', 'pencil']" class="text-success" />
          </button>
        </div>
        <div class="input-group" v-else>
          <input class="form-control form-control-sm" v-model="editJarName" />

          <button class="btn btn-success" type="button" @click="updateJarName">
            <font-awesome-icon :icon="['fas', 'floppy-disk']" />
          </button>
          <button
            class="btn btn-danger"
            type="button"
            @click="editNameIsVisible = false"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            v-model="showWatched"
          />
          <label
            class="form-check-label text-white"
            for="flexSwitchCheckDefault"
            >Include Watched</label
          >
        </div>
        <button
          class="btn btn-success"
          @click="setAsActive"
          :disabled="isSelectedJar"
        >
          Set as active jar
        </button>
        <button
          class="btn btn-danger"
          v-if="!deleteConfirmationIsVisible"
          @click="deleteConfirmationIsVisible = true"
        >
          Delete jar
        </button>
        <div class="d-grid gap-2" v-else>
          <div>Are you sure you wish to remove this jar forever!?</div>
          <div
            class="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button type="button" class="btn btn-success" @click="deleteJar">
              Kill it
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="deleteConfirmationIsVisible = false"
            >
              Let it live
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-row justify-content-between bd-highlight text-white mb-2"
  >
    <h3>
      {{ selectedJar?.name
      }}<font-awesome-icon
        v-if="isSelectedJar"
        class="icon text-success ms-2"
        icon="fa-solid fa-check-circle"
      />
    </h3>
    <button class="btn btn btn-dark" @click="showSidebar">
      <font-awesome-icon class="icon" icon="fa-solid fa-gear" />
    </button>
  </div>

  <div class="list-container">
    <div class="d-grid gap-2 mb-2">
      <RouterLink class="btn btn-outline-success" :to="{ name: 'jar.addmovie' }"
        >Add Movie</RouterLink
      >
    </div>
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
      <i class="fa-solid fa-otter"></i>
      <font-awesome-icon
        class="text-success"
        icon="fa-solid fa-otter"
        size="5x"
      />
      <p class="text-white">Nothing to see here</p>
    </div>
  </div>
</template>
<style scoped type="scss">
.icon {
  font-size: 1.5rem;
}
</style>
