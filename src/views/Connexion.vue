<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    // Attention: l'URL dépend du security.yaml de Symfony. 
    // Souvent '/login' ou '/login_check'
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    
    // On sauvegarde le token dans le navigateur
    localStorage.setItem('token', response.data.token)
    
    // On redirige vers la page d'accueil (le dashboard)
    router.push({ name: 'home' }) // Assure-toi que le nom de la route correspond à ton router/index.js
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    alert('Identifiants incorrects ou problème serveur !')
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Connecte-toi !</button>
    </form>
  </div>
</template>