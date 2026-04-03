<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// L'étape actuelle (1, 2, 3...)
const currentStep = ref(1)

// Notre "tiroir" à réponses (le fameux Mock)
const formData = ref({
  transport: '',
  regime: '',
  achats: '',
  chauffage: ''
})

// Fonctions pour naviguer entre les étapes
const nextStep = () => {
  currentStep.value++
}

const prevStep = () => {
  currentStep.value--
}

// Fonction finale : l'envoi
const submitForm = () => {
  // Pour l'instant on fait juste un console.log (Mock)
  console.log("Données prêtes à être envoyées à Symfony :", formData.value)
  
  // Plus tard : await api.post('/api/onboarding', formData.value)
  
  // On redirige vers l'accueil une fois terminé
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="onboarding-container">
    <h1>Bienvenue, apprenons à te connaître !</h1>
    
    <div v-if="currentStep === 1">
      <h2>Quels moyens de transport utilises-tu ?</h2>
      <label>
        <input type="radio" value="voiture" v-model="formData.transport" /> Voiture
      </label>
      <label>
        <input type="radio" value="transports_en_commun" v-model="formData.transport" /> Transports en commun
      </label>
      <label>
        <input type="radio" value="velo_pied" v-model="formData.transport" /> Vélo / À pied
      </label>
      
      <button @click="nextStep" :disabled="!formData.transport">Suivant</button>
    </div>

    <div v-if="currentStep === 2">
      <h2>Quel est ton régime alimentaire ?</h2>
      <select v-model="formData.regime">
        <option value="" disabled>Choisis une option</option>
        <option value="viande_tous_les_jours">Viande tous les repas</option>
        <option value="equilibre">Équilibré (Viande 3-5 fois/semaine)</option>
        <option value="vegetarien">Végétarien / Végétalien</option>
      </select>
      
      <button @click="prevStep">Retour</button>
      <button @click="nextStep" :disabled="!formData.regime">Suivant</button>
    </div>

    <div v-if="currentStep === 3">
      <h2>Tes habitudes à la maison</h2>
      
      <p>Chauffage principal :</p>
      <select v-model="formData.chauffage">
        <option value="" disabled>Choisis une option</option>
        <option value="gaz">Gaz / Fioul</option>
        <option value="electrique">Électrique</option>
        <option value="renouvelable">Bois / Renouvelable</option>
      </select>
      
      <button @click="prevStep">Retour</button>
      <button @click="submitForm" :disabled="!formData.chauffage">Enregistrer</button>
    </div>

  </div>
</template>