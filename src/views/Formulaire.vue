<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t, locale } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const currentStep = ref(1)
const errorMessage = ref('')
const isLoading = ref(false)

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

const handleCreateAccount = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = t('onboarding.error_password')
    return
  }
  if (!formData.value.cguAccepted) {
    errorMessage.value = t('onboarding.error_cgu')
    return
  }

  try {
    isLoading.value = true
    await authStore.register({
      email: formData.value.email,
      password: formData.value.password,
      firstName: formData.value.prenom,
    })
    errorMessage.value = ''
    currentStep.value = 2
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const handleSaveHabits = async () => {
  if (formData.value.transports.length === 0 || !formData.value.regime || !formData.value.achats || !formData.value.chauffage) {
    errorMessage.value = t('onboarding.error_empty')
    return
  }

  try {
    isLoading.value = true

    // Login pour récupérer le token
    await authStore.login(formData.value.email, formData.value.password)

    // Sauvegarder le profil
    await authStore.saveProfile({
      transport: formData.value.transports.join(','),
      diet: formData.value.regime,
      shopping: formData.value.achats,
      heating: formData.value.chauffage,
    })

    router.push({ name: 'home' })

  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const switchLang = (lang) => {
  locale.value = lang
}
</script>

<template>
    <div class="onboarding-page">
        
        <div class="lang-switcher">
            <button :class="{ active: locale === 'fr' }" @click="switchLang('fr')">FR</button>
            <button :class="{ active: locale === 'en' }" @click="switchLang('en')">EN</button>
        </div>

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
            <label for="prenom">{{ t('onboarding.firstname') }}</label>
            <input type="text" id="prenom" v-model="formData.prenom" :placeholder="t('onboarding.firstname_placeholder')" required />
            </div>

            <div class="form-group">
            <label for="nom">{{ t('onboarding.lastname') }}</label>
            <input type="text" id="nom" v-model="formData.nom" :placeholder="t('onboarding.lastname_placeholder')" required />
            </div>

            <div class="form-group">
            <label for="email">{{ t('onboarding.email') }}</label>
            <input type="email" id="email" v-model="formData.email" :placeholder="t('onboarding.email_placeholder')" required />
            </div>

            <div class="form-group">
            <label for="password">{{ t('onboarding.password') }}</label>
            <input type="password" id="password" v-model="formData.password" :placeholder="t('onboarding.password_placeholder')" required />
            </div>

            <div class="form-group">
            <label for="confirmPassword">{{ t('onboarding.confirm_password') }}</label>
            <input type="password" id="confirmPassword" v-model="formData.confirmPassword" :placeholder="t('onboarding.password_placeholder')" required />
            </div>

            <div class="form-checkbox">
            <input type="checkbox" id="cgu" v-model="formData.cguAccepted" required />
            <label for="cgu">{{ t('onboarding.cgu') }}</label>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ t('onboarding.submit_btn1') }}
            </button>
        </form>
        </div>

        <div v-if="currentStep === 2" class="step-2-container">
        
        <div class="welcome-banner">
            <h2 v-html="t('onboarding.welcome', { name: formData.prenom || 'user_name' })"></h2>
            <div class="speech-bubble">
            <p>{{ t('onboarding.speech') }}</p>
            </div>
        </div>

        <form @submit.prevent="handleSaveHabits" class="habits-form">
            
            <div class="question-block">
            <h3 v-html="t('onboarding.q1_title')"></h3>
            
            <label class="custom-checkbox">
                <input type="checkbox" value="commun" v-model="formData.transports" />
                <span class="label-text" v-html="t('onboarding.q1_opt1')"></span>
            </label>
            
            <label class="custom-checkbox">
                <input type="checkbox" value="motorise" v-model="formData.transports" />
                <span class="label-text" v-html="t('onboarding.q1_opt2')"></span>
            </label>
            
            <label class="custom-checkbox">
                <input type="checkbox" value="vert" v-model="formData.transports" />
                <span class="label-text" v-html="t('onboarding.q1_opt3')"></span>
            </label>
            </div>

            <div class="question-block">
            <h3>{{ t('onboarding.q2_title') }}</h3>
            
            <label class="custom-radio">
                <input type="radio" value="viande_tous_repas" v-model="formData.regime" required />
                <img src="@/assets/images/viande.svg" alt="Viande" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">{{ t('onboarding.q2_opt1') }}</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="viande_regulier" v-model="formData.regime" />
                <img src="@/assets/images/viande_2.svg" alt="Viande régulièrement" style="width: 45px; margin-right: 15px;" />
                <span class="label-text" v-html="t('onboarding.q2_opt2')"></span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="viande_peu" v-model="formData.regime" />
                <img src="@/assets/images/viande_3.svg" alt="Peu de viande" style="width: 45px; margin-right: 15px;" />
                <span class="label-text" v-html="t('onboarding.q2_opt3')"></span>
            </label>

            <label class="custom-radio">
                <input type="radio" value="vegetarien" v-model="formData.regime" />
                <img src="@/assets/images/viande_4.svg" alt="Végétarien" style="width: 45px; margin-right: 15px;" />
                <span class="label-text" v-html="t('onboarding.q2_opt4')"></span>
            </label>
            </div>

            <div class="question-block">
            <h3 v-html="t('onboarding.q3_title')"></h3>
            <label class="custom-radio"><input type="radio" value="tres_rarement" v-model="formData.achats" required /> <span class="label-text">{{ t('onboarding.q3_opt1') }}</span></label>
            <label class="custom-radio"><input type="radio" value="occasionnellement" v-model="formData.achats" /> <span class="label-text">{{ t('onboarding.q3_opt2') }}</span></label>
            <label class="custom-radio"><input type="radio" value="souvent" v-model="formData.achats" /> <span class="label-text">{{ t('onboarding.q3_opt3') }}</span></label>
            <label class="custom-radio"><input type="radio" value="tres_souvent" v-model="formData.achats" /> <span class="label-text">{{ t('onboarding.q3_opt4') }}</span></label>
            </div>

            <div class="question-block">
            <h3>{{ t('onboarding.q4_title') }}</h3>
            
            <label class="custom-radio">
                <input type="radio" value="renouvelable" v-model="formData.chauffage" required />
                <img src="@/assets/images/cheminee.svg" alt="Cheminée" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">{{ t('onboarding.q4_opt1') }}</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="electrique" v-model="formData.chauffage" />
                <img src="@/assets/images/chauffage_elec.svg" alt="Électrique" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">{{ t('onboarding.q4_opt2') }}</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="gaz" v-model="formData.chauffage" />
                <img src="@/assets/images/gaz.svg" alt="Gaz" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">{{ t('onboarding.q4_opt3') }}</span>
            </label>
            
            <label class="custom-radio">
                <input type="radio" value="fioul" v-model="formData.chauffage" />
                <img src="@/assets/images/fioul.svg" alt="Fioul" style="width: 45px; margin-right: 15px;" />
                <span class="label-text">{{ t('onboarding.q4_opt4') }}</span>
            </label>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button type="submit" class="btn-submit btn-orange" :disabled="isLoading">
            {{ isLoading ? 'Enregistrement...' : t('onboarding.submit_btn2') }}
            </button>
        </form>
        </div>

    </div>
</template>