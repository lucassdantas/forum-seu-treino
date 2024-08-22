import { BACKEND_URL } from '@/constants';
import axios from 'axios';

type LikeData = {
  likeAuthorId: number;
  likePostId: number;
};

export const likePost = async (data: LikeData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/likeController.php`, data);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (data: LikeData) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}controllers/likeController.php`, { data });
    return response.data;
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};