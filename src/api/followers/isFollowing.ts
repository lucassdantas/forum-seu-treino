import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const isFollowing = async (currentUserId: number, profileOwnerId: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/followerController.php`, {
      params: {
        followerUserFollower: currentUserId,
        followerUserFollowed: profileOwnerId
      }
    });
    return response.data.isFollower;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
};
