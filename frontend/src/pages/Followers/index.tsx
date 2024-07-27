import { currentUserContext } from '@/api/users/currentUserContext'
import { Banner } from '@/components/common/Banner'
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects'
import { FollowersBody } from '@/pages/Followers/FollowersBody'
import axios from 'axios'
import { useEffect, Dispatch, SetStateAction, useContext  } from 'react'

type SetAuthType = Dispatch<SetStateAction<boolean>>;

interface FollowersProps{
    setAuth:SetAuthType;
}
export const Followers = ({setAuth}:FollowersProps) => {
    const currentUser = useContext(currentUserContext)
    useEffect(() => {
        const checkSession = async () => {
            try {
            const response = await axios.get('http://localhost/backend/checkSession.php', { withCredentials: true });
            if (!response.data.loggedIn) {setAuth(false);}
            } catch (error) {
            console.error('There was an error checking the session!', error);
            }
        };
        checkSession();
    }, [setAuth]);
    return (
        <div>
            <Banner/>
            <PhotoFollowerAndSubjects followers={currentUser.userFollowers} subjects={currentUser.userSubjects} profileName={currentUser.userName}/>
            <FollowersBody/>
        </div>
    )
}
