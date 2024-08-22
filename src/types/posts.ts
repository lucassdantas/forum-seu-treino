
export interface PostType{
  postId:number;
  postAuthorId:number;
  postTopicId:number;
  postContent:string;
  postImage:string;
  postDateOfCreation:string;
  postLikesQuantity:number;
  postCommentsQuantity:number;
  postHasImage:boolean;
  postIsEdited?:boolean;
}

