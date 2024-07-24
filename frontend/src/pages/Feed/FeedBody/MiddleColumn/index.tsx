import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { GrayCard } from '@/components/common/Card';
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/api/posts/getPosts';
import { currentUserContext } from '@/api/users/currentUserContext';
import { PostType } from '@/api/posts/posts';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { UserImage } from '@/components/UserImage';
import { createPost } from '@/api/posts/createPost';

export const MiddleColumn = () => {
  const currentUser = useContext(currentUserContext);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const handleNewPost = async (postContent: string) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    const newPost: PostType = {
      postId: posts.length + 1, // Provisoriamente definindo postId como length + 1. Idealmente, o backend geraria o ID.
      postTopicId: 1,
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
        <div className='flex justify-end'>
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
