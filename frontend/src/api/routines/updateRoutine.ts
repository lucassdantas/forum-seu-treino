import { BACKEND_URL } from '@/constants';
import { Routines } from '@/types/routines';
import axios from 'axios';

export const updateRoutine = async (routine: Routines) => {
  try {
    const response = await axios.put(`${BACKEND_URL}controllers/routineController.php`, routine); // Remover `params` e enviar diretamente
    return response.data;
  } catch (error) {
    console.error('Error updating routine:', error);
    return null;
  }
};
