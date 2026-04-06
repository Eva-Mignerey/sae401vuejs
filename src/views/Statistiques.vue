<script setup>
import { ref, computed } from 'vue'

const userName = ref('David')
const activePeriod = ref('mois')

const mockData = {
  semaine: [12, 15, 9, 20, 14, 18, 10],
  mois: [15, 14, 18, 22, 20, 15, 10, 12, 16, 25, 22, 18, 14, 12],
  annee: [450, 420, 380, 410, 390, 350, 320, 310, 340, 400, 430, 460]
}

const currentData = computed(() => mockData[activePeriod.value])

const maxVal = computed(() => Math.max(...currentData.value) * 1.2)

const points = computed(() => {
  return currentData.value.map((val, index) => {
    const x = (index / (currentData.value.length - 1)) * 100
    const y = 100 - ((val / maxVal.value) * 100)
    return { x, y, val }
  })
})

const polylinePoints = computed(() => {
  return points.value.map(p => `${p.x},${p.y}`).join(' ')
})

const periodLabel = computed(() => {
  if (activePeriod.value === 'semaine') return 'de la semaine'
  if (activePeriod.value === 'mois') return 'du mois'
  return "de l'année"
})

const totalCO2 = computed(() => currentData.value.reduce((a, b) => a + b, 0))
</script>

<template>
  <div class="stats-page">
    <header class="top-bar">
      <button class="burger-icon">☰</button>
      <span class="username">{{ userName }}</span>
    </header>

    <main class="main-content">
      <h2 class="page-title">Ton bilan {{ periodLabel }}</h2>

      <div class="stats-container">
        <div class="period-selector">
          <button :class="{ active: activePeriod === 'semaine' }" @click="activePeriod = 'semaine'">Semaine</button>
          <button :class="{ active: activePeriod === 'mois' }" @click="activePeriod = 'mois'">Mois</button>
          <button :class="{ active: activePeriod === 'annee' }" @click="activePeriod = 'annee'">Année</button>
        </div>

        <div class="chart-card">
          <p class="chart-subtitle">Graphique {{ activePeriod }}</p>
          
          <div class="svg-container">
            <svg viewBox="-5 -5 110 110" class="line-chart">
              <polyline fill="none" stroke="black" stroke-width="1" points="0,0 0,100 100,100" />
              <polyline fill="none" stroke="red" stroke-width="1.5" :points="polylinePoints" />
              <circle v-for="(pt, i) in points" :key="i" :cx="pt.x" :cy="pt.y" r="2" fill="blue" />
            </svg>
          </div>
        </div>

        <div class="extra-stats-grid">
          <div class="stat-box">
            <h3>Total émis</h3>
            <p class="stat-value">{{ totalCO2 }} <span>kg CO₂</span></p>
          </div>
          <div class="stat-box">
            <h3>Moyenne</h3>
            <p class="stat-value">{{ Math.round(totalCO2 / currentData.length) }} <span>kg/j</span></p>
          </div>
          <div class="stat-box full-width">
            <h3>Équivalent Voiture</h3>
            <p class="stat-value">{{ Math.round(totalCO2 * 4.5) }} <span>km parcourus 🚗</span></p>
          </div>
        </div>
      </div>

      <div class="mascot-container">
        <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.stats-page {
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

.page-title {
  color: #3B4A54;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.period-selector {
  display: flex;
  justify-content: space-between;
  background-color: #E0E0E0;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
}

.period-selector button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  transition: 0.3s;
}

.period-selector button.active {
  background-color: #F08C4A;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.chart-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.chart-subtitle {
  font-size: 12px;
  color: #3B4A54;
  margin-top: 0;
  margin-bottom: 15px;
}

.svg-container {
  width: 100%;
  aspect-ratio: 4/3;
}

.line-chart {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.extra-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.stat-box {
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.stat-box.full-width {
  grid-column: span 2;
}

.stat-box h3 {
  font-size: 13px;
  color: #666;
  margin: 0 0 10px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 900;
  color: #7CB342;
  margin: 0;
}

.stat-value span {
  font-size: 12px;
  font-weight: normal;
  color: #333;
}

.mascot-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.mascot {
  width: 80px;
}

@media (min-width: 768px) {
  .stats-container {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>