import axios from "../axios";

export default async function retweetATweet(tweetId) {
    try {
        const response = await axios.post(`/api/tweet/${tweetId}/retweet`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to retweet the tweet!');
    }
}