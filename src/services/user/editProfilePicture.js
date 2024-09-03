import axios from "../axios";

export default async function editProfilePicture(userId, profilePictureData) {
    try {
        const response = await axios.post(`/api/user/${userId}/uploadProfilePic`, profilePictureData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data || 'Unable to edit profile picture!');
    }
}