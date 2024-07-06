import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import tempImage from '@/assets/profile/profilePhoto.png'

export interface PostWithAuthors extends PostType{
  authorName: User['name'];
  authorImage:User['image'];
  postContent:string;
  dateOfCreation:string;
  likesQuantity:number;
  commentsQuantity:number;

}
export const postsWithAuthorsInfo:PostWithAuthors[] = [
    {
      postId:1,
      authorId:1,
      authorName:'Arthur Nunes',
      authorImage:tempImage,
      postContent:'Conteúdo do post',
      dateOfCreation:'2024-05-30T05:03:05',
      likesQuantity: 10,
      commentsQuantity:5,
      
    },
    {
      postId:2,
      authorId:1,
      authorName:'Lucas Dantas',
      authorImage:tempImage,
      postContent:'Conteúdo do post lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ' ,
      dateOfCreation:'2024-07-04T20:42:05',
      likesQuantity: 10,
      commentsQuantity:5,
      
    },
]