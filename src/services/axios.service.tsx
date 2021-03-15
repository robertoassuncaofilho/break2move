const axios = require('axios');

export const instance = axios.create({
baseURL: 'http://localhost:8000/',
timeout: 3000
});