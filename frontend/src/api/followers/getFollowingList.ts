import { BACKEND_URL } from '@/constants';
import axios from 'axios';


interface Follower {
    userId: number;
    userName: string;
}

export const getFollowingList = async (userId: number): Promise<Follower[]> => {
  try {
      const response = await axios.get(`${BACKEND_URL}/controllers/followerController.php`, {
          params: {
              followerUserFollower: userId
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching following list', error);
      return [];
  }
};