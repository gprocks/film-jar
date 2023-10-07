import { createRouter, createWebHistory } from 'vue-router'

import { AddMovie, Home, ListMovies } from '@/views'
import PickMovieVue from '@/views/PickMovie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/AddMovie',
      name: 'addmovie',
      component: AddMovie
    },
    {
      path: '/ListMovies',
      name: 'listmovies',
      component: ListMovies
    },
    {
      path: '/PickMovie',
      name: 'pickmovie',
      component: PickMovieVue
    }
  ]
})

export default router
