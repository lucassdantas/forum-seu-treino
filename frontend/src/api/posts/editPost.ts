import axios from 'axios';
import { BACKEND_URL } from '@/constants';

export type PostToEdit = {
  postId:number,
  postContent:string,
  postHasImage:boolean,
  postLikesQuantity:number,
  postCommentsQuantity:number,
  postTopicId:number,
}

export const editPost = async ( postToEdit: PostToEdit) => {
  const {postId, postContent, postHasImage, postLikesQuantity, postCommentsQuantity, postTopicId} = postToEdit
  try {
    const response = await axios.put(`${BACKEND_URL}/controllers/postController.php`, { postId, postContent, postHasImage, postLikesQuantity, postCommentsQuantity, postTopicId });
    return response.data;
  } catch (error) {
    console.error('Error editing post:', error);
    throw error;
  }
};
