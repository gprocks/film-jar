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
} from "@fortawesome/free-solid-svg-icons";

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
);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
