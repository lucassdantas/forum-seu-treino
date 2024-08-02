import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const uploadPostImage = async (postId: number, image: File): Promise<void> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    await axios.post(`${BACKEND_URL}controllers/postImageUploadController.php?postId=${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error uploading post image:', error);
    throw error;
  }
};
