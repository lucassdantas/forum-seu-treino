import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const updateUser = async (
  userId: number,
  user: {
    userName: string;
    userEmail: string;
    userPhone: string;
    userBirthday: string;
    userPassword: string;
    userHasImage: boolean;
    userRole: string;
  }
) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/controllers/userController.php`, {
      userId,
      ...user,
    });
    console.log(response.data)
    return response.data; // Retorna os dados de resposta (assumindo que vem um 'success' no response)
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
