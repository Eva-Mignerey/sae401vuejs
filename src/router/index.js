import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      redirect: '/connexion'
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/Connexion.vue')
    },
    {
      path: '/formulaire',
      name: 'formulaire',
      component: () => import('../views/Formulaire.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: () => import('../views/Statistiques.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuestionnaireQuotidien.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/connexion')
  } else if (to.name === 'connexion' && token) {
    next('/home')
  } else {
    next()
  }
})

export default router