import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getLikes = async () => {
  try {
    const response = await axios.get(BACKEND_URL+'controllers/likeController.php', {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    return [];
  }
};
