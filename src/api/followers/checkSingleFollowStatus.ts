import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const checkSingleFollowStatus = async (currentUserId: number, friendId: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`, {
      params: {
        followerUserFollower: currentUserId,
        followerUserFollowed: friendId
      }
    });
    return response.data.isFollower;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
};
