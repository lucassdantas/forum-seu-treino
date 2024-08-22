import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const getPostsByAuthorId = async (authorId: number) => {
  const id = authorId
  try {
      const response = await axios.get(`${BACKEND_URL}controllers/postController.php`, {
          params: { id },
          withCredentials: true,
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching posts by authorId:', error);
      return [];
  }
};
