import { useContext, useEffect, useRef, useState } from 'react';
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
import { getTopics } from '@/api/topics/getTopics';
import { toast } from 'react-toastify';
import { CiImageOn } from 'react-icons/ci';
import { uploadPostImage } from '@/api/posts/uploadPostImage'; // Importe a função para upload da imagem

export const MiddleColumn = () => {
  const { currentUser } = useUser();
  if (!currentUser) return <Login />;
  
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPostContent, setCurrentPostContent] = useState<string>('');
  const [topics, setTopics] = useState<{ topicId: number; topicName: string }[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    if(postContent === '') return toast.error("Escreva um conteúdo para postar.");

    const newPost: Omit<PostType, 'postId'> = {
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

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.postId !== postId));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='text-white flex flex-col w-full md:w-2/4 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
          <UserImage userId={currentUser.userId} userHasImage={currentUser.userHasImage}/>
          <input
            placeholder={'No que você está pensando, ' + currentUser?.userName + '?'}
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
        {imagePreview && <img src={imagePreview} alt='Image preview' className='w-[100%] max-h-[220px] object-cover mb-4' />}
        <div className='flex justify-end gap-4 items-center'>
          <CiImageOn onClick={() => fileInputRef.current?.click()} className='cursor-pointer text-2xl' />
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
