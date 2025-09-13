import "./global.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "vue3-toastify/dist/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import {
  faPlus,
  faTv,
  faList,
  faSearch,
  faCircleCheck,
  faCirclePlus,
  faTrash,
  faEye,
  faArrowUp,
  faCircleXmark,
  faLink,
  faJar,
  faOtter,
  faGear,
  faPencil,
  faFloppyDisk,
  faXmark,
  faFileImport,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useJarStore } from "./stores/jarStore";
import { useWatchlistStore } from "./stores/watchlistStore";

/* add icons to the library */
library.add(
  faPlus,
  faTv,
  faList,
  faSearch,
  faCircleCheck,
  faCirclePlus,
  faTrash,
  faEye,
  faArrowUp,
  faCircleXmark,
  faLink,
  faJar,
  faOtter,
  faGear,
  faPencil,
  faFloppyDisk,
  faFileImport,
  faXmark,
  faClock,
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
const store = useJarStore();
store.init();
useWatchlistStore();
app.mount("#app");
