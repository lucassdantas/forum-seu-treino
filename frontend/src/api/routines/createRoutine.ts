// src/api/routines/getUserRoutines.ts
import { BACKEND_URL } from '@/constants';
import { Routines } from '@/types/routines';
import axios from 'axios';

export const createRoutine = async (routine:Routines) => {
  try {
    const response = await axios.post(`${BACKEND_URL}controllers/routineController.php`, 
      routine, {withCredentials:true}
    );
    return response.data; // Supondo que os dados retornados sejam uma lista de rotinas
  } catch (error) {
    console.error('Error fetching user routines:', error);
    return [];
  }
};
