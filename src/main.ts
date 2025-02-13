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
  faGear
} from "@fortawesome/free-solid-svg-icons";
import { useJarStore } from "./stores/jarStore";

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
  faGear
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
const store = useJarStore();
store.init();
app.mount("#app");
