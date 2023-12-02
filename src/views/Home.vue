<script setup lang="ts">
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="row">
    <div class="col">
      <div
        class="d-grid d-md-flex justify-content-md-evenly gap-4 col-12 mx-auto"
      >
        <router-link to="AddMovie" class="btn btn-outline-success p-4">
          <div>
            <font-awesome-icon class="fa-3x mb-2" icon="fa-solid fa-plus" />
          </div>
          <span class="h4">Add Movie</span>
        </router-link>
        <router-link to="PickMovie" class="btn btn-outline-success p-4">
          <div>
            <font-awesome-icon class="fa-3x mb-2" icon="fa-solid fa-tv" />
          </div>
          <span class="h4">Pick Movie</span>
        </router-link>
        <router-link to="ListMovies" class="btn btn-outline-success p-4">
          <div>
            <font-awesome-icon class="fa-3x mb-2" icon="fa-solid fa-list" />
          </div>
          <span class="h4">List Movies</span>
        </router-link>
        <router-link to="connections" class="btn btn-outline-success p-4">
          <div>
            <font-awesome-icon :icon="['fas', 'link']" />
          </div>
          <span class="h4">Connections</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped type="scss">
svg {
  width: 120px;
  height: 120px;
}
</style>
