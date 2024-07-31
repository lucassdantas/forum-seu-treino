import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const deleteTopic = async (topicUrl: string) => {
  try {
    await axios.delete(`${BACKEND_URL}controllers/topicController.php`, {
      data: { topicUrl }
    });
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};
