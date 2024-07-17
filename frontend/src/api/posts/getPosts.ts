import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('http://localhost/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
