import { UserInFollowContextProps , userInFollowContext as externalFollower} from '@/api/users/userInFollowContext';
import { Limiter } from '@/components/common/Limiter';
import { UserInFollowContextCard } from '@/components/UserInFollowContextCard';
import { IoSearch } from "react-icons/io5";
export const FollowersBody = () => {
    const followers:UserInFollowContextProps[] = externalFollower;

    return (
    <div className='bg-black w-full flex justify-center'>
        <Limiter>
            <div className='bg-black mt-12 '>
                <div className='flex border border-neutral-500 focus:border-neutral-200 text-white items-center gap-2 w-64 p-2'>
                    <IoSearch className='text-yellow-seu-treino text-lg'/>
                    <input className='bg-transparent outline-none w-full' type='text' placeholder='Procurar' />
                </div>
                <div>
                    {followers.map((follower:UserInFollowContextProps, i) => <UserInFollowContextCard key={i}  user={follower}/>)}
                </div>
            </div>
        </Limiter>
    </div>
  )
}