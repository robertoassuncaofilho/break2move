import axios from 'axios'

export const instance = axios.create({
baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/':'https://break2move.herokuapp.com',
timeout: 3000
});