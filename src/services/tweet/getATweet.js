import axios from "../axios";

export default async function getATweet(tweetId) {
    try {
        const response = await axios.get(`/api/tweet/${tweetId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to get tweet!');
    }
}