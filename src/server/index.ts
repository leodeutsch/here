import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://here-backend.onrender.com',
})
