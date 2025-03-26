import axios from 'axios'
// import { useAuthStore } from '@/presentation/stores/authStore'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       const token = localStorage.getItem('access_token')
//       error.config!.headers.Authorization = `Bearer ${token}`
//       return axios.request(error.config!)
//     }
//     return Promise.reject(error)
//   },
// )

export default api
