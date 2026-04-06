<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(1)

const formData = ref({
  prenom: '',
  nom: '',
  email: '',
  password: '',
  confirmPassword: '',
  cguAccepted: false,
  transports: [], 
  regime: '',
  achats: '',
  chauffage: ''
})

const handleCreateAccount = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("Les mots de passe ne correspondent pas !")
    return
  }
  if (!formData.value.cguAccepted) {
    alert("Tu dois accepter la politique de confidentialité.")
    return
  }
  currentStep.value = 2
}

const handleSaveHabits = () => {
  localStorage.setItem('token', 'faux-token-demo-8h')
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="onboarding-page">
    
    <div class="progress-header">
      <div class="mascot-container">
        <img src="@/assets/images/mascotte_1.svg" alt="Mascotte" class="mascot-progress" />
      </div>
      <div class="stepper">
        <div class="step" :class="{ active: currentStep >= 1 }">1</div>
        <div class="line"></div>
        <div class="step" :class="{ active: currentStep >= 2 }">2</div>
        <div class="line"></div>
        <div class="step" :class="{ active: currentStep >= 3 }">3</div>
      </div>
    </div>

    <div v-if="currentStep === 1" class="step-1-container">
      <form @submit.prevent="handleCreateAccount" class="register-form">
        
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" v-model="formData.prenom" placeholder="Tape ton prénom ici..." required />
        </div>

        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" v-model="formData.nom" placeholder="Tape ton nom ici..." required />
        </div>

        <div class="form-group">
          <label for="email">Adresse mail</label>
          <input type="email" id="email" v-model="formData.email" placeholder="Tape ton adresse mail ici..." required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="formData.password" placeholder="Tape ton mot de passe ici..." required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" placeholder="Tape ton mot de passe ici..." required />
        </div>

        <div class="form-checkbox">
          <input type="checkbox" id="cgu" v-model="formData.cguAccepted" required />
          <label for="cgu">J'accepte la politique de confidentialité</label>
        </div>

        <button type="submit" class="btn-submit">Créer mon compte</button>
      </form>
    </div>

    <div v-if="currentStep === 2" class="step-2-container">
      
      <div class="welcome-banner">
        <h2>Bienvenue, <strong>{{ formData.prenom || 'user_name' }}</strong> !</h2>
        <div class="speech-bubble">
          <p>Pour bien utiliser l'app, tu dois d'abord renseigner tes habitudes de transports, consommations, etc... À toi de jouer !</p>
        </div>
      </div>

      <form @submit.prevent="handleSaveHabits" class="habits-form">
        
        <div class="question-block">
          <h3>Quels moyens de transport utilises-tu ?<br><small>(Tu peux en choisir plusieurs)</small></h3>
          
          <label class="custom-checkbox">
            <input type="checkbox" value="commun" v-model="formData.transports" />
            <span class="label-text"><strong>Transports en commun</strong> (trains, bus, blablacar)</span>
          </label>
          
          <label class="custom-checkbox">
            <input type="checkbox" value="motorise" v-model="formData.transports" />
            <span class="label-text"><strong>Véhicules motorisés</strong> (voitures, motos)</span>
          </label>
          
          <label class="custom-checkbox">
            <input type="checkbox" value="vert" v-model="formData.transports" />
            <span class="label-text"><strong>Véhicules verts</strong> (vélos, trottinette, à pieds)</span>
          </label>
        </div>

        <div class="question-block">
          <h3>Quel est ton régime alimentaire ?</h3>
          
          <label class="custom-radio">
            <input type="radio" value="viande_tous_repas" v-model="formData.regime" required />
            <span class="label-text">Viande presque tous les repas</span>
          </label>
          
          <label class="custom-radio">
            <input type="radio" value="viande_regulier" v-model="formData.regime" />
            <span class="label-text"><strong>Viande régulièrement</strong> (viande 4-5 fois/semaine)</span>
          </label>
          
          <label class="custom-radio">
            <input type="radio" value="viande_peu" v-model="formData.regime" />
            <span class="label-text"><strong>Peu de viande</strong> (viande 1-2 fois/semaine)</span>
          </label>

          <label class="custom-radio">
            <input type="radio" value="vegetarien" v-model="formData.regime" />
            <span class="label-text"><strong>Végétarien/Vegan</strong></span>
          </label>
        </div>

        <div class="question-block">
          <h3>À quelle fréquence achètes-tu des produits neufs ?<br><small>(vêtement, technologie...)</small></h3>
          <label><input type="radio" value="tres_rarement" v-model="formData.achats" required /> Très rarement</label><br>
          <label><input type="radio" value="occasionnellement" v-model="formData.achats" /> Occasionnellement</label><br>
          <label><input type="radio" value="souvent" v-model="formData.achats" /> Souvent</label><br>
          <label><input type="radio" value="tres_souvent" v-model="formData.achats" /> Très souvent</label>
        </div>

        <div class="question-block">
          <h3>Quel type de chauffage utilises-tu dans ton logement ?</h3>
          <label><input type="radio" value="renouvelable" v-model="formData.chauffage" required /> Énergies renouvelables / bois</label><br>
          <label><input type="radio" value="electrique" v-model="formData.chauffage" /> Électrique</label><br>
          <label><input type="radio" value="gaz" v-model="formData.chauffage" /> Gaz</label><br>
          <label><input type="radio" value="fioul" v-model="formData.chauffage" /> Fioul</label>
        </div>

        <button type="submit" class="btn-submit btn-orange">Enregistrer</button>
      </form>
    </div>

  </div>
</template>

<style scoped>
.onboarding-page {
  background-color: #F8F3E6;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  padding-bottom: 80px; 
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.mascot-container {
  margin-right: 15px;
}

.mascot-progress {
  width: 60px;
}

.stepper {
  display: flex;
  align-items: center;
}

.step {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #E0E0E0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.step.active {
  background-color: #F08C4A;
}

.line {
  width: 30px;
  height: 2px;
  background-color: #E0E0E0;
}

.step-1-container .register-form {
  background-color: transparent;
  border: 1px solid #F08C4A;
  border-radius: 15px;
  padding: 25px 20px;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 900;
  margin-bottom: 5px;
  font-size: 14px;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-checkbox input {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.form-checkbox label {
  font-size: 13px;
  font-weight: bold;
}

.btn-submit {
  background-color: #7CB342;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-orange {
  background-color: #F08C4A;
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
}

.welcome-banner {
  text-align: center;
  margin-bottom: 30px;
}

.welcome-banner h2 {
  color: #4A3A31;
  font-size: 20px;
}

.speech-bubble {
  background-color: #F08C4A;
  color: white;
  padding: 15px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 13px;
  position: relative;
  display: inline-block;
  margin-top: 10px;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: -10px;
  left: 20px;
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent #F08C4A transparent;
}

.habits-form {
  max-width: 400px;
  margin: 0 auto;
}

.question-block {
  margin-bottom: 30px;
}

.question-block h3 {
  font-size: 16px;
  color: #000;
  margin-bottom: 15px;
  text-align: center;
}

.question-block h3 small {
  font-weight: normal;
  font-size: 13px;
  color: #666;
}

.custom-checkbox, .custom-radio, .question-block label {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #F08C4A;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
}

.custom-checkbox input, .custom-radio input, .question-block label input {
  margin-right: 15px;
  width: 18px;
  height: 18px;
  accent-color: #F08C4A; 
}

.label-text {
  font-size: 14px;
}

.custom-checkbox:has(input:checked), .custom-radio:has(input:checked), .question-block label:has(input:checked) {
   border: 2px solid #2196F3;
}
</style>