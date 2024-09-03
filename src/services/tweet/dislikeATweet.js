import axios from "../axios";

export default async function dislikeATweet(tweetId) {
    try {
        const response = await axios.post(`/api/tweet/${tweetId}/dislike`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to dislike the tweet!');
    }
}