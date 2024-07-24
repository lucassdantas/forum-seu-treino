import axios from 'axios';

export interface CommentsWithAuthors {
  commentId: number;
  postId: number;
  authorId: number;
  authorImage: string;
  authorName: string;
  commentContent: string;
  dateOfCreation: string;
}

export const getCommentsWithAuthors = async (postId: number): Promise<CommentsWithAuthors[]> => {
  const response = await axios.get(`/backend/controllers/commentController.php?postId=${postId}`);
  return response.data;
};
