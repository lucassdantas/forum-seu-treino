import { useState } from 'react';
import { UserInFollowContextProps, userInFollowContext as externalFollower } from '@/api/users/userInFollowContext';
import { Limiter } from '@/components/common/Limiter';
import { UserInFollowContextCard } from '@/components/UserInFollowContextCard';
import { IoSearch } from "react-icons/io5";

export const FollowersBody = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const followers: UserInFollowContextProps[] = externalFollower;

    const filteredFollowers = followers.filter(follower =>
        follower.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-black w-full flex justify-center px-4'>
            <Limiter>
                <div className='bg-black mt-12 '>
                    <div className='flex border border-neutral-500 focus:border-neutral-200 text-white items-center gap-2 w-64 p-2'>
                        <IoSearch className='text-yellow-seu-treino text-lg'/>
                        <input
                            className='bg-transparent outline-none w-full'
                            type='text'
                            placeholder='Procurar'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
                        {filteredFollowers.map((follower: UserInFollowContextProps, i) => (
                            <UserInFollowContextCard key={i} user={follower}/>
                        ))}
                    </div>
                </div>
            </Limiter>
        </div>
    );
};
