import axios from "../axios";

export default async function commentOnATweet(tweetId, content) {
    try {
        const response = await axios.post(`/api/tweet/${tweetId}/reply`, { content });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to comment on the tweet!');
    }
}