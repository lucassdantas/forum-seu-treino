import { BACKEND_URL } from "@/constants";
import axios from "axios";

export const followUser = async (currentUserId: number, friendId: number): Promise<boolean> => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/followerController.php`, {
      followerUserFollower: currentUserId,
      followerUserFollowed: friendId
    });
    return response.data.message === "Follower was created.";
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
};