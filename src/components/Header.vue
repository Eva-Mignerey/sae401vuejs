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
    <router-link to="/home" class="nav-item">🏠 {{ t('menu.home') }}</router-link>
    <router-link to="/quiz" class="nav-item">📝 Quiz</router-link>
    <router-link to="/statistiques" class="nav-item">📊 {{ t('menu.stats') }}</router-link>
    
    <div class="lang-switch">
      <button @click="changeLocale('fr')">FR</button>
      <button @click="changeLocale('en')">EN</button>
    </div>

    <button @click="logout" class="logout-btn">{{ t('auth.logout') }}</button>
  </nav>
</template>

<style scoped>
.main-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 10px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  font-family: 'Arial', sans-serif;
}

.nav-item {
  text-decoration: none;
  color: #4A3A31;
  font-weight: bold;
  font-size: 14px;
}

.lang-switch button {
  margin: 0 2px;
  border: 1px solid #F08C4A;
  background: white;
  color: #F08C4A;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn {
  background-color: #E53935;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
}

@media (min-width: 768px) {
  .main-nav {
    bottom: auto;
    top: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
}
</style>