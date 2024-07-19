import tempImage from '@/assets/profile/profilePhoto.png'

export interface User{
    userId:number;
    userName:string;
    userProfileImage:string;
    userCoverImage:string;
    userFollowers:number;
    userSubjects:number;
}