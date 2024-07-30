import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/common/Button'
import { GrayCard } from '@/components/common/Card'
import { PostCard } from '@/components/PostCard'
import { User } from '@/types/user'
import { createPost } from '@/api/posts/createPost'
import { PostType } from '@/types/posts'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { getPostsByAuthorId } from '@/api/posts/getPostsByAuthorId'
import { UserImage } from '@/components/UserImage'
import {  useUser } from '@/context/currentUserContext'
import { deletePost } from '@/api/posts/deletePost'
import Login from '@/pages/Login'

export const MiddleColumn = ({ user }: { user: User }) => {
  const {currentUser} = useUser()
  if(!currentUser) return <Login/>
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPostsByAuthorId(user.userId);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [user.userId]);

  const handleNewPost = async (postContent: string) => {
    if (postContent.trim() === '') return;

    const newPostData: PostType = {
      postId: posts.length + 1,
      postTopicId: 1, // Supondo um tópico padrão ou ajuste conforme necessário
      postAuthorId: currentUser.userId,
      postContent: postContent,
      postDateOfCreation: new Date().toISOString(),
      postImage: '', // Ajuste conforme necessário
      postHasImage: false, // Ajuste conforme necessário
      postLikesQuantity: 0,
      postCommentsQuantity: 0,
    };

    try {
      await createPost(newPostData);
      setPosts([newPostData, ...posts]);
      setCurrentPostContent('');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='text-white flex flex-col w-full md:w-2/4 gap-4'>
      {user.userId === currentUser.userId &&
        <GrayCard>
          <div className='flex gap-4 mb-4'>
            {user.userId === currentUser.userId ? <UserImage userId={currentUser.userId} /> : ''}
            <input
              placeholder={`No que você está pensando, ${currentUser?.userName}?`}
              className='w-full bg-transparent placeholder:to-zinc-100 outline-1 px-2'
              value={currentPostContent}
              onChange={(e) => setCurrentPostContent(e.target.value)}
            />
          </div>
          <div className='flex justify-end'>
            <Button className='w-full' onClick={() => handleNewPost(currentPostContent)}>Publicar</Button>
          </div>
        </GrayCard>
      }

      {!posts && <LoadingSpinner />}
      {posts.length > 0 && posts.map((post: PostType, i) => (
        <PostCard key={i} post={post} onDelete={handleDeletePost} />
      ))}
      {posts.length === 0 && <span className='w-full text-center'>Nenhuma postagem encontrada.</span>}
    </div>
  );
};