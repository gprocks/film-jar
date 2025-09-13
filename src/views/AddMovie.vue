<script setup lang="ts">
import { toast } from "vue3-toastify";

import { useJarStore } from "@/stores/jarStore";
import { TmdbSearch } from "@/components";
import { computed, ref } from "vue";
import { AppConfig } from "@/dto";

const store = useJarStore();

export interface Props {
  jarid?: string;
}

const props = withDefaults(defineProps<Props>(), {
  jarid: "",
});

const selectedJarRef = ref(props.jarid || store.activeJarId);

const selectedRefs = computed(() => {
  return (
    store.jarConfig[selectedJarRef.value]?.contents.map((r) => r.tmdbRef) || []
  );
});

const jarOptions = computed(() => {
  return Object.values(store.jarConfig).map((x) => ({
    text: x.name,
    value: x.id,
  }));
});

function triggerAction(result) {
  store.addMovie(
    { name: result.title, tmdbRef: result.id, watched: false },
    selectedJarRef.value,
  );
  toast(`${result.title} added to jar`, AppConfig.defaultToastSettings);
}
</script>

<template>
  <h3>Add Movie</h3>
  <div class="form-group" v-if="!props.jarid">
    <label for="lstJarSelection" class="text-white">Jar</label>
    <select
      class="form-control mb-2"
      id="lstJarSelection"
      v-model="selectedJarRef"
    >
      <option
        v-for="(opt, index) in jarOptions"
        :key="`opt_${index}`"
        :value="opt.value"
      >
        {{ opt.text }}
      </option>
    </select>
  </div>
  <div class="d-grid gap-2 mb-2" v-else>
    <RouterLink class="btn btn-outline-success" :to="{ name: 'jar' }"
      >Back to Jar</RouterLink
    >
  </div>
  <tmdb-search @mediaSelected="triggerAction" :disableList="selectedRefs" />
</template>
<style scoped type="scss"></style>
