import { PostWithAuthors } from "@/api/posts/postsWithAuthorsInfo"
import tempImage from '@/assets/profile/profilePhoto.png'

export interface Comments {
  commentId:number;
  authorId:number;
  postId:number;
  commentContent:string;
  dateOfCreation:string;
}
export const comments:Comments[] = [
    {
        commentId:1,
        authorId:1,
        postId:1,
        commentContent:'comentário 01',
        dateOfCreation:'2024-05-30T05:03:05',
    },
    {
      commentId:2,
      authorId:2,
      postId:2,
      commentContent:'comentário 02',
      dateOfCreation:'2024-05-25T05:03:05',
    },
]