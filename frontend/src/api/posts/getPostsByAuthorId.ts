import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const getPostsByAuthorId = async (authorId: number) => {
    try {
        const response = await axios.get(`${BACKEND_URL}controllers/postController.php`, {
            params: { authorId },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by authorId:', error);
        return [];
    }
};
