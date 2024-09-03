import axios from "../axios";

export default async function login(userName, password) {
    try {
        const response = await axios.post('/api/auth/login', {
            userName,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to login!');
    }
}