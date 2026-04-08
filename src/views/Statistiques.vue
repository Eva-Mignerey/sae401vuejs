<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'

const { t } = useI18n()
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
  if (activePeriod.value === 'semaine') return t('stats.of_week')
  if (activePeriod.value === 'mois') return t('stats.of_month')
  return t('stats.of_year')
})

const totalCO2 = computed(() => currentData.value.reduce((a, b) => a + b, 0))
</script>

<template>
    <TopBar :userName="userName" />
  <div class="stats-page">

    <main class="main-content">
      <h2 class="page-title">{{ t('stats.title', { period: periodLabel }) }}</h2>

      <div class="stats-container">
        <div class="period-selector">
          <button :class="{ active: activePeriod === 'semaine' }" @click="activePeriod = 'semaine'">{{ t('stats.week') }}</button>
          <button :class="{ active: activePeriod === 'mois' }" @click="activePeriod = 'mois'">{{ t('stats.month') }}</button>
          <button :class="{ active: activePeriod === 'annee' }" @click="activePeriod = 'annee'">{{ t('stats.year') }}</button>
        </div>

        <div class="chart-card">
          <p class="chart-subtitle">{{ t('stats.chart_subtitle', { period: t(`stats.period_${activePeriod}`) }) }}</p>
          
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
            <h3>{{ t('stats.total_emitted') }}</h3>
            <p class="stat-value">{{ totalCO2 }} <span>{{ t('stats.kg_co2') }}</span></p>
          </div>
          <div class="stat-box">
            <h3>{{ t('stats.average') }}</h3>
            <p class="stat-value">{{ Math.round(totalCO2 / currentData.length) }} <span>{{ t('stats.kg_per_day') }}</span></p>
          </div>
          <div class="stat-box full-width">
            <h3>{{ t('stats.car_equivalent') }}</h3>
            <p class="stat-value">{{ Math.round(totalCO2 * 4.5) }} <span>{{ t('stats.km_driven') }}</span></p>
          </div>
        </div>
      </div>

      <div class="mascot-container">
        <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot" />
      </div>
    </main>
  </div>
</template>