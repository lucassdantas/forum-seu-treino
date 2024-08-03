export interface User{
    userId:number;
    userName:string;
    userHasImage:string | number | boolean;
    userBirthday:string;
    userCoverImage:string;
    userFollowers:number;
    userEmail:string;
    userSubjects:number;
    userPhone:string;
    userRole?:string;
}