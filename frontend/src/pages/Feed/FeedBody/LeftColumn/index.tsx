import {  useContext, useEffect, useState } from 'react'
import { GrayCard } from '@/components/common/Card'
import { TopicType } from '@/api/topics'
import { TopicsList } from '@/pages/Feed/components/TopicsList'
import { getTopics } from '@/api/topics/getTopics'
import { FriendsSuggestion } from '@/pages/Feed/components/FriendsSuggestion'
import { getUsers } from '@/api/users/getUsers'
import { User } from '@/types/user'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useUser } from '@/context/currentUserContext'
import Login from '@/pages/Login'

export const LeftColumn = () => {
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
        {topicsList ? <TopicsList topics={topicsList} /> : <LoadingSpinner />}
      </GrayCard>

      <GrayCard>
        <h4 className='mb-4'>Sugestões de amizade</h4>
        {friendsList ? <FriendsSuggestion friends={friendsList} currentUserId={currentUser.userId} /> : <LoadingSpinner />}
      </GrayCard>
    </div>
  );
};