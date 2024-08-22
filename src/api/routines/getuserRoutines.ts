// src/api/routines/getUserRoutines.ts
import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const getUserRoutines = async (userId: number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}controllers/routineController.php`, {
      params: { routineUserId: userId }
    });
    return response.data; // Supondo que os dados retornados sejam uma lista de rotinas
  } catch (error) {
    console.error('Error fetching user routines:', error);
    return [];
  }
};
