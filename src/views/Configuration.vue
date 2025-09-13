<script setup lang="ts">
import { computed, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { toast } from "vue3-toastify";
import { useJarStore } from "@/stores/jarStore";
import { AppConfig } from "@/dto";
const jarStore = useJarStore();

//#region Import
const showImportInput = ref(false);
const importFileValid = ref(false);
let selectedFile = ref<File>(null);
const dataExtract = computed(() => {
  let data = {
    jarConfig: JSON.parse(localStorage.getItem("jarConfig")),
    watchlist: JSON.parse(localStorage.getItem("filmList")),
  };
  return `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
});
//#endregion
function toggleImportShow(show: boolean) {
  selectedFile.value = null;
  importFileValid.value = false;
  showImportInput.value = show;
}
function onImportFileChange(event) {
  selectedFile.value = null;
  let files = event.target.files || event.dataTransfer.files;
  if (!files.length) {
    return;
  }
  selectedFile.value = files[0];
  if (!selectedFile.value.name.endsWith(".json")) {
    importFileValid.value = false;
    toast("Invalid Filetype", AppConfig.defaultToastSettings);
    return;
  } else {
    importFileValid.value = true;
  }
}
function importData() {
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    //@ts-ignore
    const data: { [key: string]: Jar } = JSON.parse(
      //@ts-ignore
      event.target.result,
    ).jarConfig;
    let dataArray = Object.values(data);
    jarStore.bulkAdd(dataArray);

    toast("Data Imported!", AppConfig.defaultToastSettings);
    showImportInput.value = false;
  };
  fileReader.onerror = () => {
    toast("Error Reading file", AppConfig.defaultToastSettings);
  };
  fileReader.readAsText(selectedFile.value);
}
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
    <button
      class="btn btn-outline-success"
      v-if="!showImportInput"
      @click="toggleImportShow(true)"
    >
      Import Data
    </button>
    <div class="input-group" v-else>
      <input
        @change="onImportFileChange"
        class="form-control"
        type="file"
        id="formFile"
        ref="fuImportData"
      />
      <button
        class="btn btn-success"
        type="button"
        @click="importData"
        :disabled="!selectedFile || !importFileValid"
      >
        <font-awesome-icon :icon="['fas', 'file-import']" />
      </button>
      <button
        class="btn btn-danger"
        type="button"
        @click="toggleImportShow(false)"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </div>
</template>
<style scoped type="scss"></style>
