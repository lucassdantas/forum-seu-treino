import { BACKEND_URL } from '@/constants';
import axios from 'axios';

interface Follower {
    userId: number;
    userName: string;
    userHasImage: string | boolean | number;
}

export const getFollowersList = async (userId: number): Promise<Follower[]> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/controllers/followerController.php`, {
            params: {
                followerUserFollowed: userId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching followers list', error);
        return [];
    }
};