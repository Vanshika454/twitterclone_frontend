import axios from "../axios";

export default async function register(name, email, userName, password) {
    try {
        const response = await axios.post('/api/auth/register', {
            name, 
            email, 
            userName, 
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to register!');
    }
}
