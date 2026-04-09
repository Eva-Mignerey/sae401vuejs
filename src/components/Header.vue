
<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

function changeLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

function logout() {
  localStorage.removeItem('token')
  router.push('/connexion')
}
</script>

<template>
    <nav class="main-nav">
        <div class="pictogrammes">
        <router-link to="/home" class="nav-item">
            <img src="@/assets/images/accueil.svg" alt="maison" class="picto">
            <span class="nav-text">{{ t('menu.home') }}</span>
        </router-link>
        <router-link to="/quiz" class="nav-item">
            <img src="@/assets/images/formulaire.svg" alt="maison" class="picto">
            <span class="nav-text">{{ t('menu.form') }}</span>
        </router-link>
        <router-link to="/statistiques" class="nav-item">
            <img src="@/assets/images/statistiques.svg" alt="maison" class="picto">
            <span class="nav-text">{{ t('menu.stats') }}</span>
        </router-link>
        </div>

        <div class="lang-switch desktop-only">
        <button @click="changeLocale('fr')">FR</button>
        <button @click="changeLocale('en')">EN</button>
        </div>

        <button @click="logout" class="logout-btn desktop-only">
        {{ t('auth.logout') }}
        </button>
    </nav>
</template>