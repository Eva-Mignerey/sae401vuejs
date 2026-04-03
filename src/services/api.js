import axios from 'axios'

// Configure l'URL de base de ton backend Symfony
const api = axios.create({
  baseURL: 'http://localhost:8000/api' // À vérifier avec ta collègue
})

// L'interceptor : il s'exécute avant CHAQUE requête
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api