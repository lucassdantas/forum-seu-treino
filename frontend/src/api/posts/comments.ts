import { PostWithAuthors } from "@/api/posts/postsWithAuthorsInfo"
import tempImage from '@/assets/profile/profilePhoto.png'

export interface Comment extends Omit<PostWithAuthors, 'commentsQuantity'>  {
}
export const comments:Comment[] = [
    {
        id:1,
        author:'Arthur Nunes',
        authorImage:tempImage,
        postContent:'Conteúdo do comentário',
        dateOfCreation:'2024-05-30T05:03:05',
        likesQuantity: 5,
      },
    {
        id:2,
        author:'Arthur Nunes',
        authorImage:tempImage,
        postContent:'Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário',
        dateOfCreation:'2024-05-30T05:03:05',
        likesQuantity: 10,
      },
]