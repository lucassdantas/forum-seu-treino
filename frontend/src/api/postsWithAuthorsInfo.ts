import tempImage from '@/assets/profile/profilePhoto.png'

export interface PostWithAuthors {
  id:number;
  author:string;
  authorImage:string;
  postContent:string;
  dateOfCreation:string;
  likesQuantity:number;
  commentsQuantity:number;

}
export const postsWithAuthorsInfo:PostWithAuthors[] = [
    {
      id:1,
      author:'Arthur Nunes',
      authorImage:tempImage,
      postContent:'Conteúdo do post',
      dateOfCreation:'2024-05-30T05:03:05',
      likesQuantity: 10,
      commentsQuantity:5,
      
    },
    {
      id:2,
      author:'Lucas Dantas',
      authorImage:tempImage,
      postContent:'Conteúdo do post lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ' ,
      dateOfCreation:'2024-07-04T20:42:05',
      likesQuantity: 10,
      commentsQuantity:5,
      
    },
]