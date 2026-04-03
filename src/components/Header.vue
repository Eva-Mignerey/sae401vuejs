
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function changeLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <header class="header">
    <div class="header-bar">
      <h1>{{ t('menu.users') }}</h1>
      <button class="burger" @click="toggleMenu">☰</button>
    </div>

    <nav class="mobile-menu" :class="{ open: menuOpen }">
      <router-link to="/">{{ t('menu.home') }}</router-link>
        <router-link to="/statistiques">{{ t('menu.stats') }}</router-link>
        <router-link to="/formulaire">{{ t('menu.form') }}</router-link>
        <router-link to="/connexion">{{ t('menu.connexion') }}</router-link>

      <div class="lang-switch">
        <button @click="changeLocale('fr')">FR</button>
        <button @click="changeLocale('en')">EN</button>
      </div>
    </nav>
  </header>
</template>
