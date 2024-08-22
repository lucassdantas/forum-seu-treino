// @api/users/deleteUser.ts
import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}controllers/userController.php`, { data: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: error };
  }
};
