import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { PostType } from '@/api/posts/posts';

export const createPost = async (postData:PostType) => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/postController.php`, postData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; 
  }
};
