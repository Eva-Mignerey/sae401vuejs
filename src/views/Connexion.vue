<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '../services/api'

const { t } = useI18n()
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
  <div class="body-connexion">

    <img src="@/assets/images/logo_collecte.svg" alt="Logo" class="logo" />
    <h1 class="titre-logo" v-html="t('loginPage.welcome_title')"></h1>

    <div class="mascot-section">
      <div class="speech-bubble">
        <p v-html="t('loginPage.speech_bubble')"></p>
      </div>

      <img 
        src="@/assets/images/mascotte_1.svg" 
        alt="Mascotte" 
        class="mascot" 
      />
    </div>

    <div class="login-container">
    <div class="container-orange">
        <form @submit.prevent="handleLogin">
        <input 
            type="email" 
            v-model="email" 
            :placeholder="t('loginPage.email_placeholder')" 
            class="input-field"
            required 
        />
        <input 
            type="password" 
            v-model="password" 
            :placeholder="t('loginPage.password_placeholder')" 
            class="input-field"
            required 
        />
        <button type="submit" class="btn-vert">
            {{ t('loginPage.submit_btn') }}
        </button>
        </form>
        <div class="signup-link">
        <p class="texte-bas">{{ t('loginPage.no_account') }}</p>
        <router-link :to="{ name: 'formulaire' }" class="texte-bas">
            {{ t('loginPage.create_account') }}
        </router-link>
        </div>
    </div>
    </div>

  </div>
</template>