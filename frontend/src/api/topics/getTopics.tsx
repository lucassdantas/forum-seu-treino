import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const getTopics = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/topicController.php`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};
