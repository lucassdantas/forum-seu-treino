import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get(BACKEND_URL+'controllers/postController.php', {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
