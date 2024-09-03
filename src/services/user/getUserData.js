import axios from "../axios";

export default async function getUserData(userId) {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to get user data!');
  }
}