import axios from "../axios";

export default async function likeATweet(tweetId) { 
    try {
        const response = await axios.post(`/api/tweet/${tweetId}/like`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to like the tweet!');
    }
}