<script setup lang="ts">
import { toast } from "vue3-toastify";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { useJarStore } from "@/stores/jarStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const store = useJarStore();
const { activeJarId } = storeToRefs(store);

const addFormIsVisible = ref(false);
const newJarName = ref("");

function showAddForm() {
  newJarName.value = "";
  addFormIsVisible.value = true;
}

function addJar() {
  store.addJar(newJarName.value);
  toast(`${newJarName.value} created`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
  addFormIsVisible.value = false;
}
</script>

<template>
  <h3>My Jars</h3>
  <div class="d-grid gap-2 mb-2" v-if="addFormIsVisible">
    <div>
      <input
        type="search"
        class="form-control"
        :class="{ 'is-invalid': false }"
        placeholder="Jar Name"
        aria-label="Movie Title"
        aria-describedby="Movie Title"
        v-model="newJarName"
      />
      <div class="invalid-feedback">You need to name it something!</div>
    </div>
    <div class="btn-group">
      <button class="btn btn-success" @click="addJar" :disabled="!newJarName">
        Save
      </button>
      <button class="btn btn-outline-success" @click="addFormIsVisible = false">
        Cancel
      </button>
    </div>
  </div>
  <div class="d-grid gap-2 mb-2" v-else>
    <button class="btn btn-success" @click="showAddForm">Open a new Jar</button>
  </div>
  <div class="list-group">
    <RouterLink
      type="button"
      class="list-group-item list-group-item-action d-flex"
      v-for="jar in store.jars"
      :key="jar.id"
      :to="{ name: 'jar', params: { jarid: jar.id } }"
    >
      <span class="me-auto">
        {{ jar.name }}
      </span>
      <div>
        <font-awesome-icon
          v-if="activeJarId === jar.id"
          class="icon text-primary"
          icon="fa-solid fa-circle-check"
        />
      </div>
    </RouterLink>
  </div>
</template>
<style scoped type="scss"></style>
