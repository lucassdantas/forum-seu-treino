import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const unfollowUser = async (currentUserId: number, friendId: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${BACKEND_URL}controllers/followerController.php`, {
      data: {
        followerUserFollower: currentUserId,
        followerUserFollowed: friendId
      }
    });
    return response.data.message === 'Follower was deleted.';
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
};