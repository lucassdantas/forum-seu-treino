import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getFollowersCount = async (userId: number): Promise<number> => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`, {
      params: {
        followerUserFollowed: userId
      }
    });
    return response.data.length; // Supondo que a resposta é uma lista de seguidores
  } catch (error) {
    console.error('Error fetching followers count:', error);
    return 0;
  }
};
