<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'

const { t } = useI18n()
const router = useRouter()
const userName = ref('David')
const currentStep = ref(1)

const dailyData = ref({
  alimentation: {
    regime: '',
    local: '',
    dechets: ''
  },
  transport: {
    mode: '',
    distance: 0,
    motorisation: ''
  },
  consommation: {
    achats: '',
    occasion: '',
    emballage: ''
  },
  logement: {
    chauffage: '',
    appareils: [],
    veille: ''
  }
})

const nextStep = () => {
  currentStep.value++
}

const submitQuiz = () => {
  router.push({ name: 'home' })
}

const toggleAppareil = (appareil) => {
  const index = dailyData.value.logement.appareils.indexOf(appareil)
  if (index === -1) {
    dailyData.value.logement.appareils.push(appareil)
  } else {
    dailyData.value.logement.appareils.splice(index, 1)
  }
}
</script>

<template>
    <TopBar :userName="userName" />
    <div class="quiz-page">

        <main class="main-content">
        <div v-if="currentStep === 1" class="quiz-card">
            <h2>{{ t('results.alimentation') }}</h2>
            
            <div class="question-block">
            <p>{{ t('quiz.food.q1') }}</p>
            <div class="btn-grid">
                <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'vegetalien' }]" @click="dailyData.alimentation.regime = 'vegetalien'">{{ t('quiz.food.vegan') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'vegetarien' }]" @click="dailyData.alimentation.regime = 'vegetarien'">{{ t('quiz.food.vegetarian') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'blanche' }]" @click="dailyData.alimentation.regime = 'blanche'">{{ t('quiz.food.white_meat') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'rouge' }]" @click="dailyData.alimentation.regime = 'rouge'">{{ t('quiz.food.red_meat') }}</button>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.food.q2') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="oui" v-model="dailyData.alimentation.local"> {{ t('quiz.common.yes') }}</label>
                <label><input type="radio" value="non" v-model="dailyData.alimentation.local"> {{ t('quiz.common.no') }}</label>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.food.q3') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="rien" v-model="dailyData.alimentation.dechets"> {{ t('quiz.common.nothing') }}</label>
                <label><input type="radio" value="peu" v-model="dailyData.alimentation.dechets"> {{ t('quiz.common.little') }}</label>
                <label><input type="radio" value="beaucoup" v-model="dailyData.alimentation.dechets"> {{ t('quiz.common.a_lot') }}</label>
            </div>
            </div>

            <div class="footer-step">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
            <button @click="nextStep" class="btn-next">{{ t('quiz.next_btn') }}</button>
            </div>
        </div>

        <div v-if="currentStep === 2" class="quiz-card">
            <h2>{{ t('results.transports') }}</h2>
            
            <div class="question-block">
            <p>{{ t('quiz.transport.q1') }}</p>
            <div class="btn-grid">
                <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'marche_velo' }]" @click="dailyData.transport.mode = 'marche_velo'">{{ t('quiz.transport.walk_bike') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'commun' }]" @click="dailyData.transport.mode = 'commun'">{{ t('quiz.transport.public') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'voiture' }]" @click="dailyData.transport.mode = 'voiture'">{{ t('quiz.transport.car') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'covoiturage' }]" @click="dailyData.transport.mode = 'covoiturage'">{{ t('quiz.transport.carpool') }}</button>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.transport.q2') }}</p>
            <input type="range" min="0" max="200" v-model="dailyData.transport.distance" class="slider">
            <p class="slider-value">{{ dailyData.transport.distance }} km</p>
            </div>

            <div class="question-block" v-if="dailyData.transport.mode === 'voiture' || dailyData.transport.mode === 'covoiturage'">
            <p>{{ t('quiz.transport.q3') }}</p>
            <div class="btn-grid">
                <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'thermique' }]" @click="dailyData.transport.motorisation = 'thermique'">{{ t('quiz.transport.thermic') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'hybride' }]" @click="dailyData.transport.motorisation = 'hybride'">{{ t('quiz.transport.hybrid') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'electrique' }]" @click="dailyData.transport.motorisation = 'electrique'">{{ t('quiz.transport.electric') }}</button>
            </div>
            </div>

            <div class="footer-step">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
            <button @click="nextStep" class="btn-next">{{ t('quiz.next_btn') }}</button>
            </div>
        </div>

        <div v-if="currentStep === 3" class="quiz-card">
            <h2>{{ t('results.consommation') }}</h2>
            
            <div class="question-block">
            <p>{{ t('quiz.consumption.q1') }}</p>
            <div class="btn-grid">
                <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'vetements' }]" @click="dailyData.consommation.achats = 'vetements'">{{ t('quiz.consumption.clothes') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'ameublement' }]" @click="dailyData.consommation.achats = 'ameublement'">{{ t('quiz.consumption.furniture') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'hightech' }]" @click="dailyData.consommation.achats = 'hightech'">{{ t('quiz.consumption.hightech') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'aucun' }]" @click="dailyData.consommation.achats = 'aucun'">{{ t('quiz.common.none') }}</button>
            </div>
            </div>

            <div class="question-block" v-if="dailyData.consommation.achats !== 'aucun' && dailyData.consommation.achats !== ''">
            <p>{{ t('quiz.consumption.q2') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="oui" v-model="dailyData.consommation.occasion"> {{ t('quiz.common.yes') }}</label>
                <label><input type="radio" value="non" v-model="dailyData.consommation.occasion"> {{ t('quiz.common.no') }}</label>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.consumption.q3') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="aucun" v-model="dailyData.consommation.emballage"> {{ t('quiz.common.none') }}</label>
                <label><input type="radio" value="peu" v-model="dailyData.consommation.emballage"> {{ t('quiz.common.little') }}</label>
                <label><input type="radio" value="beaucoup" v-model="dailyData.consommation.emballage"> {{ t('quiz.common.a_lot') }}</label>
            </div>
            </div>

            <div class="footer-step">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
            <button @click="nextStep" class="btn-next">{{ t('quiz.next_btn') }}</button>
            </div>
        </div>

        <div v-if="currentStep === 4" class="quiz-card">
            <h2>{{ t('results.logement') }}</h2>
            
            <div class="question-block">
            <p>{{ t('quiz.housing.q1') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="oui" v-model="dailyData.logement.chauffage"> {{ t('quiz.common.yes') }}</label>
                <label><input type="radio" value="non" v-model="dailyData.logement.chauffage"> {{ t('quiz.common.no') }}</label>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.housing.q2') }}</p>
            <div class="btn-grid">
                <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('lavelinge') }]" @click="toggleAppareil('lavelinge')">{{ t('quiz.housing.washing_machine') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('four') }]" @click="toggleAppareil('four')">{{ t('quiz.housing.oven') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('lavevaisselle') }]" @click="toggleAppareil('lavevaisselle')">{{ t('quiz.housing.dishwasher') }}</button>
                <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('aucun') }]" @click="toggleAppareil('aucun')">{{ t('quiz.common.none') }}</button>
            </div>
            </div>

            <div class="question-block">
            <p>{{ t('quiz.housing.q3') }}</p>
            <div class="radio-group">
                <label><input type="radio" value="oui" v-model="dailyData.logement.veille"> {{ t('quiz.common.yes') }}</label>
                <label><input type="radio" value="non" v-model="dailyData.logement.veille"> {{ t('quiz.common.no') }}</label>
            </div>
            </div>

            <div class="footer-step">
            <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
            <button @click="submitQuiz" class="btn-next">{{ t('quiz.next_btn') }}</button>
            </div>
        </div>
        </main>
    </div>
</template>