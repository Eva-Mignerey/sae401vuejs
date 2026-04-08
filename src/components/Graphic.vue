<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
  CategoryScale, LinearScale, PointElement, Filler 
} from 'chart.js'
import fakeData from '../data/data.json'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

const period = ref('week')

const chartData = computed(() => {
  const allData = fakeData.carbonprint || []
  let source = []
  
  if (period.value === 'week') {
    source = allData.slice(-7)
  } else if (period.value === 'month') {
    source = allData.slice(-31)
  } else {
    source = allData 
  }

  return {
    labels: source.map((d, index) => {
      const dateObj = new Date(d.date)
      
      if (period.value === 'year') {
        if (dateObj.getDate() === 1 || index === 0) {
          return dateObj.toLocaleDateString('fr-FR', { month: 'short' })
        }
        return ''
      }
      
      return dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    }),
    datasets: [{
      label: t('chart.carbon_score'),
      data: source.map(d => d.score),
      borderColor: '#F28435',
      borderWidth: 4,
      pointBackgroundColor: '#F28435',
      pointRadius: period.value === 'year' ? 0 : 3, 
      pointHitRadius: 10,
      backgroundColor: 'rgba(242, 132, 53, 0.1)',
      tension: 0.3,
      fill: true
    }]
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 14, weight: 'bold' }
        }
      }
    },
    scales: {
      y: { 
        min: 0, 
        max: 100,
        grid: {
          lineWidth: 2,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: { size: 14, weight: 'bold' }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: 'bold' },
          autoSkip: period.value !== 'year', 
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0
        }
      }
    }
  }
})
</script>

<template>
    <div class="tabs">
      <button @click="period = 'week'" :class="{ active: period === 'week' }">{{ t('stats.week') }}</button>
      <button @click="period = 'month'" :class="{ active: period === 'month' }">{{ t('stats.month') }}</button>
      <button @click="period = 'year'" :class="{ active: period === 'year' }">{{ t('stats.year') }}</button>
    </div>
  <div class="chart-wrapper">
    <div class="container-graph">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
