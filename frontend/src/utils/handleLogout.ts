import axios from 'axios';

export const handleLogout = async () => {
  try {
    const response = await axios.post('http://localhost/backend/logout.php', {}, { withCredentials: true });
    if (response.data.success) return false
  } catch (error) {
    return 'There was an error logging out!' + error;
  }
};