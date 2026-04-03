<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n' // 1. On importe i18n
import api from '../services/api'

const { t } = useI18n() // 2. On récupère la fonction "t" pour traduire
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    router.push({ name: 'home' })
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
      <h1 v-html="t('loginPage.welcome_title')"></h1>
    </header>

    <div class="mascot-section">
      <div class="speech-bubble">
        <p v-html="t('loginPage.speech_bubble')"></p>
      </div>
      <img src="@/assets/images/mascotte_1.svg" alt="Mascotte Feuille" class="mascot" />
    </div>

    <div class="login-card">
      <form @submit.prevent="handleLogin">
        
        <div class="form-group">
          <label for="email">{{ t('loginPage.email_label') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            :placeholder="t('loginPage.email_placeholder')" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="password">{{ t('loginPage.password_label') }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            :placeholder="t('loginPage.password_placeholder')" 
            required 
          />
        </div>

        <button type="submit" class="btn-submit">{{ t('loginPage.submit_btn') }}</button>
      </form>

      <div class="signup-link">
        <p>{{ t('loginPage.no_account') }}</p>
        <router-link :to="{ name: 'formulaire' }">{{ t('loginPage.create_account') }}</router-link>
      </div>
    </div>

  </div>
</template>