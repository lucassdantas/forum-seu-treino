// api/comments/getCommentsByPostId.ts
import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getCommentsByPostId = async (postId: number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/commentController.php?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments by post ID:', error);
    throw error;
  }
};
