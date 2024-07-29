import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const checkFollowStatus = async (currentUserId: number, friendIds: number[]): Promise<{ [key: number]: boolean }> => {
  const status: { [key: number]: boolean } = {};
  
  for (const friendId of friendIds) {
    try {
      const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`, {
        params: {
          followerUserFollower: currentUserId,
          followerUserFollowed: friendId
        }
      });
      status[friendId] = response.data.isFollower;
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  }
  
  return status;
};
