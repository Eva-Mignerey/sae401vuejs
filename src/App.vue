<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <div>
    <h1>{{ t('app.title') }}</h1>

    <nav>
      <a href="/">{{ t('menu.home') }}</a> /
      <a href="#">{{ t('menu.users') }}</a> /
      <a href="#">{{ t('menu.settings') }}</a>
    </nav>

    <p>{{ t('auth.welcome', { name: 'à vous' }) }}</p>

    <button @click="changeLocale('fr')">FR</button>
    <button @click="changeLocale('en')">EN</button>
  </div>
</template>