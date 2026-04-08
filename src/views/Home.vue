<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'

const { t } = useI18n()

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
    <TopBar :userName="userName" />
    <div class="home-page">

        <main class="main-content">
        
        <section class="daily-survey">
            <h2>{{ t('home.daily') }}</h2>
            
            <router-link 
            to="/quiz" 
            class="btn-survey" 
            style="display: block; font-size: 16px; text-align: center; text-decoration: none; box-sizing: border-box;"
            >
            {{ t('home.do_quiz') }}
            </router-link>
        </section>

        <section class="yesterday-results">
            <h2>{{ t('home.yesterday') }}</h2>
            
            <div class="results-card">
            <div class="grid-categories">

                <div class="category-box">
                <h3>{{ t('results.transports') }}</h3>
                <p class="data-value">{{ results.transports }} kg</p>
                </div>

                <div class="category-box">
                <h3>{{ t('results.alimentation') }}</h3>
                <p class="data-value">{{ results.alimentation }} kg</p>
                </div>

                <div class="category-box">
                <h3>{{ t('results.consommation') }}</h3>
                <p class="data-value">{{ results.consommation }} kg</p>
                </div>

                <div class="category-box">
                <h3>{{ t('results.logement') }}</h3>
                <p class="data-value">{{ results.logement }} kg</p>
                </div>

            </div>

            <div class="score-footer">
                <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
                
                <div class="score-box">
                <span class="score-label">{{ t('home.score') }}</span>
                <span class="score-value">{{ score }}</span>
                </div>
            </div>

            </div>
        </section>

        </main>
    </div>
</template>