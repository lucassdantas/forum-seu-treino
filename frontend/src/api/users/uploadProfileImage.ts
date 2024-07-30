import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const uploadProfileImage = async (userId: number, profileImage: File): Promise<boolean> => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);
  formData.append('userId', userId.toString());

  try {
    const response = await axios.post(`${BACKEND_URL}controllers/uploadController.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data.success;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return false;
  }
};
