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
  <div class="login-page">
    
    <header class="login-header">
      <img src="@/assets/images/logo_collecte.svg" alt="Logo CO2llecte" class="logo" />
      <h1>Bienvenue sur<br>CO<sub>2</sub>llecte !</h1>
    </header>

    <div class="mascot-section">
      <div class="speech-bubble">
        <p>Avant toute chose,<br>connectes-toi ou<br>créé un compte !</p>
      </div>
      <img src="@/assets/images/mascotte_1.svg" alt="Mascotte Feuille" class="mascot" />
    </div>

    <div class="login-card">
      <form @submit.prevent="handleLogin">
        
        <div class="form-group">
          <label for="email">Identifiant</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Tape ton identifiant ici..." 
            required 
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Tape ton mot de passe ici..." 
            required 
          />
        </div>

        <button type="submit" class="btn-submit">Connecte-toi !</button>
      </form>

      <div class="signup-link">
        <p>Tu n'as pas encore de compte ?</p>
        <router-link :to="{ name: 'formulaire' }">Alors créé en un !</router-link>
      </div>
    </div>

  </div>
</template>