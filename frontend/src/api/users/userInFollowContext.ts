import tempImage from '@/assets/profile/profilePhoto.png'

export interface UserInFollowContextProps{
    userId:number;
    userImage:string;
    userName:string;
    coverPhoto:string;
}
export const userInFollowContext:UserInFollowContextProps[] = [
    {
        userId:1,
        userImage:tempImage,
        userName:'Guy Hawkins',
        coverPhoto:tempImage,
    },
    {
        userId:2,
        userImage:tempImage,
        userName:'Lucas Dantas',
        coverPhoto:tempImage,
    },
    {
        userId:3,
        userImage:tempImage,
        userName:'Lucas Dantas',
        coverPhoto:tempImage,
    },
    {
        userId:4,
        userImage:tempImage,
        userName:'Lucas Dantas',
        coverPhoto:tempImage,
    },
]