import tempImage from '@/assets/profile/profilePhoto.png'

export interface User{
    userId:number;
    name:string;
    image:string;
    followers:number,
    subjects:number,

}

export const users:User[] = [
    {
        userId:1,
        name:"Lucas Dantas",
        image:tempImage,
        followers:40,
        subjects:50,
    },
    {
        userId:2,
        name:"Arthur Nunes",
        image:tempImage,
        followers:40,
        subjects:50,
    },
    {
        userId:3,
        name:"Arthur Nunes",
        image:tempImage,
        followers:40,
        subjects:50,
    },
    {
        userId:4,
        name:"Arthur Nunes",
        image:tempImage,
        followers:40,
        subjects:50,
    },
]