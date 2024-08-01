import { BACKEND_URL } from '@/constants';
import axios from 'axios';

export const handleLogout = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}logout.php`, {}, { withCredentials: true });
    if (response.data.success) {
      location.href='/'
    }
  } catch (error) {
    return 'There was an error logging out!' + error;
  }
};