import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const deletePost = async (postId: number) => {
  const response = await axios.delete(`${BACKEND_URL}controllers/postController.php`, {
    data: { postId },
  });
  return response.data;
};
