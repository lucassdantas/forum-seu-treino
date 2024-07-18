import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get(BACKEND_URL+'controllers/userController.php', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
