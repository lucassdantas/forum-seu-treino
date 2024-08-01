import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { GrayCard } from '@/components/common/Card';
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/api/posts/getPosts';
import { useUser } from '@/context/currentUserContext';
import { PostType } from '@/types/posts';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { UserImage } from '@/components/UserImage';
import { createPost } from '@/api/posts/createPost';
import Login from '@/pages/Login';
import { getTopics } from '@/api/topics/getTopics'; // Importe a função getTopics

export const MiddleColumn = () => {
  const { currentUser } = useUser();
  if (!currentUser) return <Login />;
  
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');
  const [topics, setTopics] = useState<{ topicId: number; topicName: string }[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1); // Defina um tópico padrão, se necessário

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    const fetchTopics = async () => {
      const topics = await getTopics();
      setTopics(topics);
    };

    fetchPosts();
    fetchTopics();
  }, []);

  const handleNewPost = async (postContent: string) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    const newPost: PostType = {
      postId: posts.length + 1, // Provisoriamente definindo postId como length + 1. Idealmente, o backend geraria o ID.
      postTopicId: selectedTopicId,
      postAuthorId: currentUser.userId,
      postContent: postContent,
      postDateOfCreation: new Date().toISOString(),
      postImage: '',
      postHasImage: false,
      postLikesQuantity: 0,
      postCommentsQuantity: 0,
    };

    try {
      await createPost(newPost);
      setPosts([newPost, ...posts]);
      setCurrentPostContent('');
      setSelectedTopicId(1); // Reseta o tópico selecionado, se necessário
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.postId !== postId));
  };

  return (
    <div className='text-white flex flex-col w-full md:w-2/4 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
          <UserImage userId={currentUser.userId} />
          <input
            placeholder={'No que você está pensando, ' + currentUser?.userName + '?'}
            className='w-full bg-transparent placeholder:to-zinc-100 outline-1 px-2'
            value={currentPostContent}
            onChange={(e) => setCurrentPostContent(e.target.value)}
          />
          
        </div>
        <div className='flex justify-end gap-4'>
          {/* <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(Number(e.target.value))}
              className='bg-transparent text-white border border-gray-400 px-2 rounded-lg'
            >
            {topics.map((topic) => (
              <option key={topic.topicId} value={topic.topicId} className='p-4 bg-neutral-700'>
                {topic.topicName}
              </option>
            ))}
          </select> */}
          <Button className='w-full' onClick={() => handleNewPost(currentPostContent)}>Publicar</Button>
        </div>
      </GrayCard>

      {!posts.length && <LoadingSpinner />}
      {posts.length > 0 && posts.map((post: PostType) => (
        <PostCard key={post.postId} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};
