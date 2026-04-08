<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'
import CarbonChart from '../components/Graphic.vue'

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
      <h2 class="page-title">
        {{ t('stats.title') }}</h2>

      <div class="stats-container">
        <div class="card shadow">
        <CarbonChart />
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