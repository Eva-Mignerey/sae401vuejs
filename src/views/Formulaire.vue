<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'

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
  if (formData.value.transports.length === 0 || !formData.value.regime || !formData.value.achats || !formData.value.chauffage) {
    alert("Veuillez sélectionner au moins une option pour chaque question.")
    return
  }
  localStorage.setItem('token', 'faux-token-demo-8h')
  router.push({ name: 'home' })
}
</script>

<template>
    <TopBar :userName="userName" />
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
                <img src="@/assets/images/viande.svg" alt="Viande" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">Viande presque tous les repas</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="viande_regulier" v-model="formData.regime" />
                <img src="@/assets/images/viande_2.svg" alt="Viande régulièrement" style="width: 45px; margin-right: 15px;" />
                <span class="label-text"><strong>Viande régulièrement</strong> (viande 4-5 fois/semaine)</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="viande_peu" v-model="formData.regime" />
                <img src="@/assets/images/viande_3.svg" alt="Peu de viande" style="width: 45px; margin-right: 15px;" />
                <span class="label-text"><strong>Peu de viande</strong> (viande 1-2 fois/semaine)</span>
            </label>

            <label class="custom-radio">
                <input type="radio" value="vegetarien" v-model="formData.regime" />
                <img src="@/assets/images/viande_4.svg" alt="Végétarien" style="width: 45px; margin-right: 15px;" />
                <span class="label-text"><strong>Végétarien/Vegan</strong></span>
            </label>
            </div>

            <div class="question-block">
            <h3>À quelle fréquence achètes-tu des produits neufs ?<br><small>(vêtement, technologie...)</small></h3>
            <label class="custom-radio"><input type="radio" value="tres_rarement" v-model="formData.achats" required /> <span class="label-text">Très rarement</span></label>
            <label class="custom-radio"><input type="radio" value="occasionnellement" v-model="formData.achats" /> <span class="label-text">Occasionnellement</span></label>
            <label class="custom-radio"><input type="radio" value="souvent" v-model="formData.achats" /> <span class="label-text">Souvent</span></label>
            <label class="custom-radio"><input type="radio" value="tres_souvent" v-model="formData.achats" /> <span class="label-text">Très souvent</span></label>
            </div>

            <div class="question-block">
            <h3>Quel type de chauffage utilises-tu dans ton logement ?</h3>
            
            <label class="custom-radio">
                <input type="radio" value="renouvelable" v-model="formData.chauffage" required />
                <img src="@/assets/images/cheminee.svg" alt="Cheminée" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">Énergies renouvelables / bois</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="electrique" v-model="formData.chauffage" />
                <img src="@/assets/images/chauffage_elec.svg" alt="Électrique" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">Électrique</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="gaz" v-model="formData.chauffage" />
                <img src="@/assets/images/gaz.svg" alt="Gaz" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">Gaz</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="fioul" v-model="formData.chauffage" />
                <img src="@/assets/images/fioul.svg" alt="Fioul" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">Fioul</span>
            </label>
            </div>

            <button type="submit" class="btn-submit btn-orange">Enregistrer</button>
        </form>
        </div>

    </div>
</template>