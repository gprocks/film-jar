// @ts-nocheck
import { createRouter, createWebHistory } from "vue-router";

import { AddMovie, Connections, Home, ListMovies, JarsConfig } from "@/views";
import PickMovieVue from "@/views/PickMovie.vue";
import Configuration from "@/views/Configuration.vue";
import RuntimeCheck from "@/views/RuntimeCheck.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/Jars",
      name: "jarsConfig",
      component: JarsConfig,
    },
    {
      path: "/AddMovie",
      name: "addmovie",
      component: AddMovie,
    },
    {
      path: "/jar/:jarid",
      name: "jar",
      redirect: {
        name: "listmovies",
      },
      children: [
        {
          path: "",
          name: "listmovies",
          component: ListMovies,
          props: true,
        },
        {
          path: "AddMovie",
          name: "jar.addmovie",
          component: AddMovie,
          props: true,
        },
      ],
    },
    {
      path: "/PickMovie",
      name: "pickmovie",
      component: PickMovieVue,
    },
    {
      path: "/Connections",
      name: "connections",
      component: Connections,
    },
    {
      path: "/Runtime",
      name: "runtime",
      component: RuntimeCheck,
    },
    {
      path: "/Configuration",
      name: "configuration",
      component: Configuration,
    },
  ],
});

export default router;
