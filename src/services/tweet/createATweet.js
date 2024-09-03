import axios from "../axios";

export default async function createATweet(tweetformData) {

    try {
        const response = await axios.post('/api/tweet', tweetformData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to create the tweet!');
    }
}