import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { PostType } from '../../types/posts';

export const createPost = async (newPost: Omit<PostType, 'postId'>): Promise<number> => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/postController.php`, newPost, { withCredentials: true });
    if (response.data.message !== "Post was created.") {
      throw new Error(response.data.message);
    }
    return response.data.postId;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
