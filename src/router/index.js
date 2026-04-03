import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name: 'home',
        component: HomeView
        },
        {
        path: '/formulaire',
        name: 'formulaire',
        component: () => import('../views/Formulaire.vue')
        },
        {
        path: '/statistiques',
        name: 'statistiques',
        component: () => import('../views/Statistiques.vue')
        },
        {
        path: '/connexion',
        name: 'connexion',
        component: () => import('../views/Connexion.vue')
        }
    ]
})

export default router