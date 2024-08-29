import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const createUser = async (user: {
    userName: string;
    userEmail: string;
    userPhone: string;
    userBirthday: string;
    userPassword: string;
    userHasImage: boolean;
    userRole:string;
}) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/controllers/userController.php`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};