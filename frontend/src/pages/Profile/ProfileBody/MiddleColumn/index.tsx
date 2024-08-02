import { useContext, useEffect, useRef, useState } from 'react'
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
import Login from '@/pages/Login'
import { toast } from 'react-toastify'
import { uploadPostImage } from '@/api/posts/uploadPostImage'
import { FaTimes } from 'react-icons/fa'
import { CiImageOn } from 'react-icons/ci'

export const MiddleColumn = ({ user }: { user: User }) => {
  const {currentUser} = useUser()
  if(!currentUser) return <Login/>

  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPostsByAuthorId(user.userId);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [user.userId]);

 const handleNewPost = async (postContent: string) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }
    if(postContent === '' && !selectedImage) return toast.error("Escreva um conteúdo para postar.");

    const newPost: Omit<PostType, 'postId'> = {
      postTopicId: selectedTopicId,
      postAuthorId: currentUser.userId,
      postContent: postContent,
      postDateOfCreation: new Date().toISOString(),
      postImage: '',
      postHasImage: !!selectedImage,
      postLikesQuantity: 0,
      postCommentsQuantity: 0,
    };

    try {
      const postId = await createPost(newPost);
      if (selectedImage) {
        await uploadPostImage(postId, selectedImage);
        newPost.postHasImage = true;
        newPost.postImage = `/postImage/${postId}/${postId}.jpg`;
      }

      setPosts([{ postId, ...newPost }, ...posts]);
      setCurrentPostContent('');
      setSelectedTopicId(1);
      setSelectedImage(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    setPosts(posts.filter(post => post.postId !== postId));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };
  return (
    <div className='text-white flex flex-col w-full md:w-2/4 gap-4'>
      {user.userId === currentUser.userId &&
        <GrayCard>
          <div className='flex gap-4 mb-4'>
            {user.userId === currentUser.userId ? <UserImage userId={currentUser.userId} userHasImage={currentUser.userHasImage} /> : ''}
            <input
              placeholder={`No que você está pensando, ${currentUser?.userName}?`}
              className='w-full bg-transparent placeholder:to-zinc-100 outline-1 px-2'
              value={currentPostContent}
              onChange={(e) => setCurrentPostContent(e.target.value)}
            />
            <input
            type='file'
            accept='.jpg'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          </div>
          {imagePreview && (
          <div className='relative mb-4'>
            <img src={imagePreview} alt='Image preview' className='w-[100%] max-h-[220px] object-cover' />
            <FaTimes 
              onClick={handleRemoveImage}
              className='absolute top-2 right-2 cursor-pointer text-white text-2xl bg-black p-1 rounded-full'
            />
          </div>
        )}
          <div className='flex justify-end items-center gap-4'>
            <CiImageOn onClick={() => fileInputRef.current?.click()} className='cursor-pointer text-2xl' />
            <Button className='w-full' onClick={() => handleNewPost(currentPostContent)}>Publicar</Button>
          </div>
        </GrayCard>
      }

      {!posts && <LoadingSpinner />}
      {posts && posts.length > 0 && posts.map((post: PostType, i) => (
        <PostCard key={i} post={post} onDelete={handleDeletePost} />
      ))}
      {posts.length === 0 && <span className='w-full text-center'>Nenhuma postagem encontrada.</span>}
    </div>
  );
};