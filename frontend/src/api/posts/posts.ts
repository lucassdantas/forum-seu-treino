
export interface PostType{
  postId:number;
  authorId:number;
  postContent:string;
  dateOfCreation:string;
  likesQuantity:number;
  commentsQuantity:number;
}

export const posts = [
    {
      author:'Arthur Nunes',
      postContent:'Conteúdo do post',
      dateOfCreation:'30-5-2024',
      likesQuantity:'10',
      commentsQuantity:'5',
      
    },
]