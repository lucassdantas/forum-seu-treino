
export interface PostType{
  postId:number;
  authorId:number;
  authorName:string;
  postContent:string;
  postDateOfCreation:string;
  likesQuantity:number;
  commentsQuantity:number;
}

export const posts:PostType[] = [
    {
      postId:1,
      authorId:1,
      authorName:'Arthur Nunes',
      postContent:'Conteúdo do post',
      postDateOfCreation:'30-5-2024',
      likesQuantity:10,
      commentsQuantity:5,
    },
]