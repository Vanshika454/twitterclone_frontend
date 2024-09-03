import axios from "../axios";

export default async function unfollowUser(userId) {
    try {
        const response = await axios.post(`/api/user/${userId}/unfollow`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to unfollow user!');
    }
}