<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t, locale } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = t('form.required')
    return
  }

  try {
    isLoading.value = true
    await authStore.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = 'Email ou mot de passe incorrect'
  } finally {
    isLoading.value = false
  }
}

const switchLang = (lang) => {
  locale.value = lang
}
</script>
<template>
    <TopBar :userName="userName" />
    <div class="login-page">
        
        <div class="lang-switcher">
            <button :class="{ active: locale === 'fr' }" @click="switchLang('fr')">FR</button>
            <button :class="{ active: locale === 'en' }" @click="switchLang('en')">EN</button>
        </div>

        <header class="login-header">
            <img src="@/assets/images/logo_collecte.svg" alt="Logo CO2llect" class="logo" />
            <h1 v-html="t('loginPage.welcome_title')"></h1>
        </header>

        <div class="mascot-section">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot" />
            <div class="speech-bubble">
                <p v-html="t('loginPage.speech_bubble')"></p>
            </div>
        </div>

        <div class="login-card">
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                <label for="email">{{ t('loginPage.email_label') }}</label>
                <input 
                    type="text" 
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

                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <button type="submit" class="btn-submit" :disabled="isLoading">
                {{ isLoading ? 'Connexion...' : t('loginPage.submit_btn') }}
                </button>
            </form>

            <div class="signup-link">
                <p>{{ t('loginPage.no_account') }}</p>
                <router-link :to="{ name: 'formulaire' }">{{ t('loginPage.create_account') }}</router-link>
            </div>
        </div>
    </div>
</template>
