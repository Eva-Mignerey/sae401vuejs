<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  if (email.value && password.value) {
    localStorage.setItem('token', 'faux-token-demo-8h')
    router.push({ name: 'home' })
  } else {
    alert('Remplis les champs !')
  }
}
</script>

<template>
  <div class="login-page">
    <header class="login-header">
      <img src="@/assets/images/logo_collecte.svg" alt="Logo CO2llect" class="logo" />
      <h1 v-html="t('loginPage.welcome_title')"></h1>
    </header>

    <div class="mascot-section">
      <div class="speech-bubble">
        <p v-html="t('loginPage.speech_bubble')"></p>
      </div>
      <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot" />
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

<style scoped>
.login-page {
  background-color: #F8F3E6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  color: #333;
  padding: 20px;
}

.login-header {
  text-align: center;
  margin-bottom: 15px;
}

.login-header h1 {
  color: #4A3A31;
  font-size: 22px;
}

.mascot-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.speech-bubble {
  background-color: #F08C4A;
  color: white;
  padding: 10px 15px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  font-size: 13px;
  position: relative;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 20px;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #F08C4A transparent transparent transparent;
}

.mascot {
  width: 90px;
}

.login-card {
  border: 1px solid #F08C4A;
  border-radius: 15px;
  padding: 25px 20px;
  width: 100%;
  max-width: 350px;
  background-color: white;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 900;
  margin-bottom: 5px;
  font-size: 13px;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.btn-submit {
  background-color: #7CB342;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  font-weight: bold;
}

.signup-link p {
  margin: 0 0 5px 0;
}

.signup-link a {
  color: #4A3A31;
}
</style>