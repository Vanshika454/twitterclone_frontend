import axios from 'axios';

// Log the base URL for debugging
console.log('API Base URL:', process.env.REACT_APP_BACKEND);

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
});

export default api;
