<script setup lang="ts">
import { toast } from "vue3-toastify";

import { useCounterStore } from "@/stores/counter";
import { TmdbSearch } from "@/components";

const store = useCounterStore();

function triggerAction(result) {
  store.addMovie({ name: result.title, tmdbRef: result.id, watched: false });
  toast(`${result.title} added to jar`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_CENTER,
  });
}
</script>

<template>
  <h3>Add Movie</h3>
  <tmdb-search
    @mediaSelected="triggerAction"
    :disableList="store.selectedIds"
  />
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
