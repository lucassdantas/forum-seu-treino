// api/comments/deleteComment.ts
import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const deleteComment = async (commentId: number) => {
  try {
    await axios.delete(`${BACKEND_URL}controllers/commentController.php?commentId=${commentId}`);
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};
