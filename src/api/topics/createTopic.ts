import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { TopicType } from '@/types/topics';

export const createTopic = async (newTopic: TopicType) => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/topicController.php`, newTopic);
    return response.data;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};
