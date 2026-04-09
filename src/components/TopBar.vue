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
    <header class="top-bar">
        <span class="username">{{ userName }}</span>
        <div class="lang-switch">
            <button @click="changeLocale('fr')">FR</button>
            <button @click="changeLocale('en')">EN</button>
        </div>

        <button @click="logout" class="logout-btn">{{ t('auth.logout') }}</button>
    </header>
</template>