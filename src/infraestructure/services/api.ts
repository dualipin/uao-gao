import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/presentation/stores/authStore'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const authStore = useAuthStore()
    if (error.response?.status === 401) {
      await authStore.refreshAccessToken()
      error.config!.headers.Authorization = `Bearer ${authStore.token}`
      return axios.request(error.config!)
    }
    return Promise.reject(error)
  },
)

export default api
