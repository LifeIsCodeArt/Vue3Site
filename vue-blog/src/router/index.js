import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/blog-pages',
      name: 'blogPages',
      component: () => import('../views/PostContent/ContentPage.vue')
    },
    {
      path: '/pages',
      name: 'Pages',
      component: () => import('../components/Posts/ThePosts.vue')
    },
    {
      path: '/sign-in-page',
      name: 'SingInPages',
      component: () => import('../views/signInPage.vue')
    },
    {
      path: '/current-post',
      name: 'currentTargetPost',
      component: () => import('../views/PostContent/PostPage.vue')
    },
    {
      path: '/service',
      name: 'Service',
      component: () => import('../views/Information/ServicePage.vue')
    },
    {
      path: '/films',
      name: 'Movies',
      component: () => import('../views/Movies/FilmCollections.vue')
    },
    {
      path: '/current-film',
      name: 'currentFilm',
      component: () => import('../views/Movies/FilmPage.vue')
    },
    {
      path: '/search-film',
      name: 'searchFilm',
      component: () => import('../views/Search/TheSearch.vue')
    },
    {
      path: '/current-person',
      name: 'currentPerson',
      component: () => import('../views/Person/PersonPage.vue')
    },
    {
      path: '/about-us',
      name: 'aboutUs',
      component: () => import('../views/Information/AboutUsPage.vue')
    },
  ]
})

export default router
