import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getComments = async () => {
  try {
    const response = await axios.get(BACKEND_URL+'controllers/commentController.php', {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
