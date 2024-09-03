import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3033',
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
});