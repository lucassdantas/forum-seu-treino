import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const getFollowers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`);
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};
