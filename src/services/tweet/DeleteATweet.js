import axios from "../axios";

export default async function deleteATweet(tweetId) {
    try {
        const response = await axios.delete(`/api/tweet/${tweetId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to delete the tweet!');
    }
}