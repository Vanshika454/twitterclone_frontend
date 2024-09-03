import axios from "../axios";

export default async function followUser(userId) {
    try {
        const response = await axios.post(`/api/user/${userId}/follow`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to follow user!');
    }
}