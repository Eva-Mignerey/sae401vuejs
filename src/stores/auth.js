import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  async function login(email, password) {
  const response = await api.post('/login', 
    { email, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  token.value = response.data.token
  localStorage.setItem('token', token.value)
}

  async function register(userData) {
    try {
      const response = await api.post('/register', userData, {
        headers: { 'Content-Type': 'application/json' }
      })
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de l\'inscription')
    }
  }

  async function saveProfile(profileData) {
  await api.post('/user_profiles', profileData)
}

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = () => !!token.value

  return { token, user, login, register, saveProfile, logout, isAuthenticated }
})