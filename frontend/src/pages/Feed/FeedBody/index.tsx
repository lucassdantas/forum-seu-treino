import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/common/Button'
import { Limiter } from '@/components/common/Limiter'
import { GrayCard } from '@/components/common/Card'
import { advertising } from '@/api/advertising'
import { TopicType } from '@/api/topics'
import { PostCard } from '@/pages/Feed/components/PostCard'
import { TopicsList } from '@/pages/Feed/components/TopicsList'
import { getPosts } from '@/api/posts/getPosts';
import { currentUserContext } from '@/api/users/currentUserContext'
import { getTopics } from '@/api/topics/getTopics'
import { FriendsSuggestion } from '@/pages/Feed/components/FriendsSuggestion'
import { getUsers } from '@/api/users/getUsers'
import { User } from '@/api/users/user'
import { PostType } from '@/api/posts/posts'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { DEFAULT_IMAGE_DIRECTORY } from '@/constants'
import { UserImage } from '@/components/UserImage'

export const FeedBody = () => {
  return (
    <div className='bg-black w-full flex justify-center pb-4 xl:px-0 px-4'>
      <Limiter>
        <div className='flex flex-col md:flex-row gap-4 md:gap-12 pt-4'>
          <LeftColumn />
          <MiddleColumn />
          <RightColumn />
        </div>
      </Limiter>
    </div>
  )
}


const LeftColumn = () => {
  const [topicsList, setTopicsList] = useState<TopicType[]>();
  const [friendsList, setFriendsList] = useState<User[]>();

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
        {friendsList ? <FriendsSuggestion friends={friendsList} /> : <LoadingSpinner />}
      </GrayCard>
    </div>
  );
};


const MiddleColumn = () => {
  const currentUser = useContext(currentUserContext)
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const handleNewPost = (postContent: string) => {
    setCurrentPostContent('');

    //setPostsWithAuthorsInfo([newPost, ...postsWithAuthorsInfo]);
  };

  return (
    <div className='text-white flex flex-col w-full md:w-2/4 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
          <UserImage userId={currentUser.userId}/>
          <input
            placeholder={'No que você está pensando, ' + currentUser?.userName + '?'}
            className='w-full bg-transparent placeholder:to-zinc-100 outline-1 px-2'
            value={currentPostContent}
            onChange={(e) => setCurrentPostContent(e.target.value)}
          />
        </div>
        <div className='flex justify-end'>
          <Button className='w-full' onClick={() => handleNewPost(currentPostContent)}>Publicar</Button>
        </div>
      </GrayCard>

      {!posts && <LoadingSpinner/>}
      {posts.length>0 && posts.map((post: PostType, i) => (
        <PostCard key={i} post={post} />
      ))}
    </div>
  );
};

const RightColumn = () => {
  return (
    <div className='text-white flex flex-col w-full md:w-1/4 gap-4'>
      {
        advertising.map((ads, i) => (
          <div key={i} className='border rounded-md'>
            <img src={ads.img} alt='Propaganda' />
          </div>
        ))
      }
    </div>
  )
}
