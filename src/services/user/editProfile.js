import axios from "../axios";

export default async function editProfile(userId, name, location, dob) {
  try {
    const response = await axios.put(`/api/user/${userId}`, { name, location, dob });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to edit profile!');
  }
}