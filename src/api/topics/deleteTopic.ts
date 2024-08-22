import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const deleteTopic = async (topicId: number) => {
  try {
    await axios.delete(`${BACKEND_URL}controllers/topicController.php?topicId=${topicId}`);
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};
