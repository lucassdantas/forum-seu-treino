import { Comments, comments } from "@/api/comments/comments.ts";
import { User} from "@/types/user";
import tempImage from '@/assets/profile/profilePhoto.png'

export interface CommentsWithAuthors extends Comments {
    authorName: User['userName'];
    authorImage:User['userProfileImage'];
    dateOfCreation:string;
}

export const commentsWithAuthors:CommentsWithAuthors[] = [
    {
        commentId:1,
        authorId:1,
        postId:1,
        authorImage:tempImage,
        authorName:'Arthur Nunes',
        commentContent:'comentário 01',
        dateOfCreation:'2024-05-30T05:03:05',
    },
    {
      commentId:2,
      authorId:2,
      postId:2,
      authorImage:tempImage,
      authorName:'Lucas Dantas',
      commentContent:'comentário 02',
      dateOfCreation:'2024-05-25T05:03:05',
    },
]