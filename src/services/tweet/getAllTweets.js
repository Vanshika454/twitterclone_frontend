import axios from "../axios";

export default async function getAllTweets() {
    try {
        const response = await axios.get('/api/tweet');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to get tweets!');
    }
}