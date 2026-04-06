<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
  <div class="quiz-page">
    <header class="top-bar">
      <button class="burger-icon">☰</button>
      <span class="username">{{ userName }}</span>
    </header>

    <main class="main-content">
      <div v-if="currentStep === 1" class="quiz-card">
        <h2>Alimentation</h2>
        
        <div class="question-block">
          <p>Quel a été votre régime aujourd'hui ?</p>
          <div class="btn-grid">
            <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'vegetalien' }]" @click="dailyData.alimentation.regime = 'vegetalien'">Végétalien</button>
            <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'vegetarien' }]" @click="dailyData.alimentation.regime = 'vegetarien'">Végétarien</button>
            <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'blanche' }]" @click="dailyData.alimentation.regime = 'blanche'">Viande blanche</button>
            <button type="button" :class="['choice-btn', { active: dailyData.alimentation.regime === 'rouge' }]" @click="dailyData.alimentation.regime = 'rouge'">Viande rouge</button>
          </div>
        </div>

        <div class="question-block">
          <p>Avez-vous consommé des produits locaux/de saison ?</p>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="dailyData.alimentation.local"> Oui</label>
            <label><input type="radio" value="non" v-model="dailyData.alimentation.local"> Non</label>
          </div>
        </div>

        <div class="question-block">
          <p>Avez-vous jeté de la nourriture aujourd'hui ?</p>
          <div class="radio-group">
            <label><input type="radio" value="rien" v-model="dailyData.alimentation.dechets"> Rien</label>
            <label><input type="radio" value="peu" v-model="dailyData.alimentation.dechets"> Peu</label>
            <label><input type="radio" value="beaucoup" v-model="dailyData.alimentation.dechets"> Beaucoup</label>
          </div>
        </div>

        <div class="footer-step">
          <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
          <button @click="nextStep" class="btn-next">Suivant</button>
        </div>
      </div>

      <div v-if="currentStep === 2" class="quiz-card">
        <h2>Transport</h2>
        
        <div class="question-block">
          <p>Quel a été votre mode de transport principal aujourd'hui ?</p>
          <div class="btn-grid">
            <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'marche_velo' }]" @click="dailyData.transport.mode = 'marche_velo'">Marche/Vélo</button>
            <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'commun' }]" @click="dailyData.transport.mode = 'commun'">Transports en commun</button>
            <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'voiture' }]" @click="dailyData.transport.mode = 'voiture'">Voiture (solo)</button>
            <button type="button" :class="['choice-btn', { active: dailyData.transport.mode === 'covoiturage' }]" @click="dailyData.transport.mode = 'covoiturage'">Covoiturage</button>
          </div>
        </div>

        <div class="question-block">
          <p>Quelle distance avez-vous parcouru aujourd'hui ?</p>
          <input type="range" min="0" max="200" v-model="dailyData.transport.distance" class="slider">
          <p class="slider-value">{{ dailyData.transport.distance }} km</p>
        </div>

        <div class="question-block" v-if="dailyData.transport.mode === 'voiture' || dailyData.transport.mode === 'covoiturage'">
          <p>Quel était le type de motorisation utilisé pour ce trajet ?</p>
          <div class="btn-grid">
            <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'thermique' }]" @click="dailyData.transport.motorisation = 'thermique'">Thermique</button>
            <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'hybride' }]" @click="dailyData.transport.motorisation = 'hybride'">Hybride</button>
            <button type="button" :class="['choice-btn', { active: dailyData.transport.motorisation === 'electrique' }]" @click="dailyData.transport.motorisation = 'electrique'">Électrique</button>
          </div>
        </div>

        <div class="footer-step">
          <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
          <button @click="nextStep" class="btn-next">Suivant</button>
        </div>
      </div>

      <div v-if="currentStep === 3" class="quiz-card">
        <h2>Consommation</h2>
        
        <div class="question-block">
          <p>Avez-vous effectué un achat de bien durable aujourd'hui ?</p>
          <div class="btn-grid">
            <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'vetements' }]" @click="dailyData.consommation.achats = 'vetements'">Vêtements</button>
            <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'ameublement' }]" @click="dailyData.consommation.achats = 'ameublement'">Ameublement</button>
            <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'hightech' }]" @click="dailyData.consommation.achats = 'hightech'">High-Tech</button>
            <button type="button" :class="['choice-btn', { active: dailyData.consommation.achats === 'aucun' }]" @click="dailyData.consommation.achats = 'aucun'">Aucun</button>
          </div>
        </div>

        <div class="question-block" v-if="dailyData.consommation.achats !== 'aucun' && dailyData.consommation.achats !== ''">
          <p>Était-ce un achat de seconde main ?</p>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="dailyData.consommation.occasion"> Oui</label>
            <label><input type="radio" value="non" v-model="dailyData.consommation.occasion"> Non</label>
          </div>
        </div>

        <div class="question-block">
          <p>Avez-vous acheté des produits avec beaucoup d'emballages plastique ?</p>
          <div class="radio-group">
            <label><input type="radio" value="aucun" v-model="dailyData.consommation.emballage"> Aucun</label>
            <label><input type="radio" value="peu" v-model="dailyData.consommation.emballage"> Peu</label>
            <label><input type="radio" value="beaucoup" v-model="dailyData.consommation.emballage"> Beaucoup</label>
          </div>
        </div>

        <div class="footer-step">
          <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
          <button @click="nextStep" class="btn-next">Suivant</button>
        </div>
      </div>

      <div v-if="currentStep === 4" class="quiz-card">
        <h2>Logement</h2>
        
        <div class="question-block">
          <p>Avez-vous réduit le chauffage ou éteint la clim en quittant votre domicile ?</p>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="dailyData.logement.chauffage"> Oui</label>
            <label><input type="radio" value="non" v-model="dailyData.logement.chauffage"> Non</label>
          </div>
        </div>

        <div class="question-block">
          <p>Avez-vous utilisé des appareil énergivores ?</p>
          <div class="btn-grid">
            <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('lavelinge') }]" @click="toggleAppareil('lavelinge')">Lave-linge</button>
            <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('four') }]" @click="toggleAppareil('four')">Four</button>
            <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('lavevaisselle') }]" @click="toggleAppareil('lavevaisselle')">Lave-vaisselle</button>
            <button type="button" :class="['choice-btn', { active: dailyData.logement.appareils.includes('aucun') }]" @click="toggleAppareil('aucun')">Aucun</button>
          </div>
        </div>

        <div class="question-block">
          <p>Avez-vous éteint vos appareils en veille ce soir ?</p>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="dailyData.logement.veille"> Oui</label>
            <label><input type="radio" value="non" v-model="dailyData.logement.veille"> Non</label>
          </div>
        </div>

        <div class="footer-step">
          <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-img" />
          <button @click="submitQuiz" class="btn-next">Suivant</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.quiz-page {
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

.quiz-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h2 {
  color: #000;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 900;
}

.question-block {
  margin-bottom: 25px;
}

.question-block p {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.choice-btn {
  background-color: #F08C4A;
  color: white;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.choice-btn.active {
  border: 2px solid #333;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
}

.radio-group {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}

.radio-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-group input {
  margin-right: 8px;
  accent-color: #F08C4A;
}

.slider {
  width: 100%;
  accent-color: #7CB342;
}

.slider-value {
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
}

.footer-step {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
}

.mascot-img {
  width: 60px;
}

.btn-next {
  background-color: #F08C4A;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
</style>