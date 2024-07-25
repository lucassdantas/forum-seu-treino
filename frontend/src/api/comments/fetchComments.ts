// api/comments/fetchComments.ts
import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const fetchComments = async (postId: number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/commentController.php?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};
