// api/comments/addComment.ts
import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const addComment = async (newComment: {
  commentContent: string;
  commentPostId: number;
  commentAuthorId: number;
  commentAuthorName:string;
}) => {
  try {
    await axios.post(`${BACKEND_URL}controllers/commentController.php`, newComment);
  } catch (error) {
    throw new Error('Failed to add comment');
  }
};
