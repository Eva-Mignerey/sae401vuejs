<script setup>
import { ref } from 'vue'

const userName = ref('David')
const score = ref(67)

const results = ref({
  transports: 15,
  alimentation: 30,
  consommation: 10,
  logement: 12
})
</script>

<template>
  <div class="home-page">
    <header class="top-bar">
      <button class="burger-icon">☰</button>
      <span class="username">{{ userName }}</span>
    </header>

    <main class="main-content">
      <section class="daily-survey">
        <h2>Ton bilan quotidien</h2>
        <router-link to="/quiz" class="btn-survey" style="display: block; text-align: center; text-decoration: none; box-sizing: border-box;">Faire le questionnaire</router-link>
      </section>

      <section class="yesterday-results">
        <h2>Résultats d'hier</h2>
        
        <div class="results-card">
          <div class="grid-categories">
            <div class="category-box">
              <h3>Transports</h3>
              <p class="data-value">{{ results.transports }} kg</p>
            </div>
            <div class="category-box">
              <h3>Alimentation</h3>
              <p class="data-value">{{ results.alimentation }} kg</p>
            </div>
            <div class="category-box">
              <h3>Consommation</h3>
              <p class="data-value">{{ results.consommation }} kg</p>
            </div>
            <div class="category-box">
              <h3>Logement</h3>
              <p class="data-value">{{ results.logement }} kg</p>
            </div>
          </div>

          <div class="score-footer">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
            <div class="score-box">
              <span class="score-label">Score</span>
              <span class="score-value">{{ score }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  background-color: #F8F3E6;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  padding-bottom: 80px;
}

.top-bar {
  background-color: #7CB342;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
}

.burger-icon {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.main-content {
  padding: 20px;
}

h2 {
  color: #3B4A54;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 10px;
}

.btn-survey {
  background-color: #F08C4A;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 30px;
}

.results-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.grid-categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.category-box {
  background-color: #F8F3E6;
  border-radius: 10px;
  padding: 15px 10px;
  text-align: center;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-box h3 {
  font-size: 12px;
  color: #000;
  margin: 0 0 5px 0;
}

.data-value {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: #7CB342;
}

.score-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
}

.mascot-img {
  width: 80px;
}

.score-box {
  background-color: #F8F3E6;
  border-radius: 10px;
  padding: 15px 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.score-label {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: -5px;
}

.score-value {
  font-size: 48px;
  font-weight: 900;
  color: #000;
  line-height: 1;
}
</style>