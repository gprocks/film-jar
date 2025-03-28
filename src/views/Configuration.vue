<script setup lang="ts">
import { computed, ref } from "vue";
const showImportInput = ref(false);
const dataExtract = computed(() => {
  let data = {
    jarConfig: JSON.parse(localStorage.getItem("jarConfig")),
    watchlist: JSON.parse(localStorage.getItem("filmList")),
  };
  return `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
});
function importData() {}
</script>

<template>
  <h3>Configuration</h3>
  <div class="d-grid gap-2">
    <a
      class="btn btn-outline-success"
      download="export.json"
      :href="dataExtract"
    >
      Export Data
    </a>
    <!-- <button class="btn btn-outline-success">Import Data</button> -->
  </div>
</template>
<style scoped type="scss"></style>
