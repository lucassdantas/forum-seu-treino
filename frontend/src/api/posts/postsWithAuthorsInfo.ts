import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import tempImage from '@/assets/profile/profilePhoto.png'

export interface PostWithAuthors extends PostType{
  authorName: User['name'];
  authorImage:User['image'];
  postContent:string;
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
      postDateOfCreation:'2024-05-30T05:03:05',
      likesQuantity: 0,
      commentsQuantity:5,
      
    },
    {
      postId:2,
      authorId:1,
      authorName:'Lucas Dantas',
      authorImage:tempImage,
      postContent:'Conteúdo do post lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ' ,
      postDateOfCreation:'2024-07-04T20:42:05',
      likesQuantity: 10,
      commentsQuantity:5,
      
    },
]