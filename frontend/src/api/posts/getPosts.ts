import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('http://localhost:80/backend/controllers/postController.php', {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
