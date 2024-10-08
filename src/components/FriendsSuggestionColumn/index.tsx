import {  useContext, useEffect, useState } from 'react'
import { GrayCard } from '@/components/common/Card'
import { TopicType } from '@/types/topics'
import { getTopics } from '@/api/topics/getTopics'
import { getUsers } from '@/api/users/getUsers'
import { User } from '@/types/user'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useUser } from '@/context/currentUserContext'
import Login from '@/pages/Login'
import { TopicsList } from '@/components/TopicsList'
import { FriendsSuggestion } from '@/components/FriendsSuggestion'

export const FriendsSuggestionColumn = () => {
  const [topicsList, setTopicsList] = useState<TopicType[]>();
  const [friendsList, setFriendsList] = useState<User[]>();
  const {currentUser} = useUser()
  if(!currentUser) return <Login/>
  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await getTopics();
      setTopicsList(topics);
    };

    const fetchFriends = async () => {
      const friends = await getUsers();
      setFriendsList(friends);
    };

    fetchTopics();
    fetchFriends();
  }, []);

  return (
    <div className='text-white flex flex-col w-full md:w-1/4 gap-4'>

      <GrayCard>
        <h4 className='mb-4'>Sugestões de amizade</h4>
        {friendsList ? <FriendsSuggestion friends={friendsList} currentUserId={currentUser.userId} /> : <LoadingSpinner />}
      </GrayCard>
    </div>
  );
};