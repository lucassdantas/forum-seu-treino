import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const getUserById = async (userId: number) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/controllers/userController.php`, {
            params: { id: userId },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
    }
};
