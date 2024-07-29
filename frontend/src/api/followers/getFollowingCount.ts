import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getFollowingCount = async (userId: number): Promise<number> => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`, {
      params: {
        followerUserFollower: userId
      }
    });
    return response.data.length; // Supondo que a resposta é uma lista de usuários seguidos
  } catch (error) {
    console.error('Error fetching following count:', error);
    return 0;
  }
};
