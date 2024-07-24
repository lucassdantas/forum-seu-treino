import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { TfiComment } from 'react-icons/tfi';
import { BsTrash3Fill, BsPencilSquare } from 'react-icons/bs'; // Importação do ícone de edição
import { GrayCard } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { UserImage } from '@/components/UserImage';
import { PostAnswer } from '@/components/PostCard/PostAnswer';
import { currentUserContext } from '@/api/users/currentUserContext';
import { getUserById } from '@/api/users/getUserById';
import { deletePost } from '@/api/posts/deletePost';
import { getCommentsByPostId } from '@/api/comments/getCommentsByPostId';
import { PostType } from '@/api/posts/posts';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { User } from '@/api/users/user';
import { Comments } from '@/api/comments/comments';
import { editPost, PostToEdit } from '@/api/posts/editPost';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type PostCardProps = {
  post: PostType;
  onDelete: (postId: number) => void;
};

export const PostCard = ({ post, onDelete }: PostCardProps) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.postContent);
  const [postAuthor, setPostAuthor] = useState<User | null>(null);
  const [commentsQuantity, setCommentsQuantity] = useState(post.postCommentsQuantity);
  const currentUser = useContext(currentUserContext);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById(post.postAuthorId);
        setPostAuthor(user);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    };

    if (post.postAuthorId !== 0) {
      fetchUserById();
    }
  }, [post.postAuthorId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsByPostId(post.postId);
        setComments(comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post.postId]);

  const handleDeletePost = async () => {
    try {
      await deletePost(post.postId);
      onDelete(post.postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleEditPost = async () => {
    try {
      const postToEdit:PostToEdit = {
        postId:post.postId,
        postContent: editContent,
        postLikesQuantity:post.postLikesQuantity,
        postCommentsQuantity:post.postCommentsQuantity,
        postHasImage:post.postHasImage,
        postTopicId:post.postTopicId,
      }
      await editPost(postToEdit);
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  if (!postAuthor) return <LoadingSpinner />;

  return (
    <div>
      <GrayCard className=''>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 ">
            <div className="flex flex-col ">
              <UserImage userId={post.postAuthorId} />
            </div>
            <div className="flex flex-col gap-1">
              <Link to={'/perfil?id=' + postAuthor.userId}>{postAuthor.userName}</Link>
              <span className='text-sm opacity-85'>{formatTimeAgo(post.postDateOfCreation)}</span>
            </div>
          </div>
          <div className=''>
            {currentUser?.userId === post.postAuthorId && (
              <div className='flex gap-2'>
                <Button onClick={handleDeletePost} className='ml-auto'><BsTrash3Fill className='font-bold text-lg' /></Button>
                <Button onClick={() => setIsEditing(true)} className='ml-auto'><BsPencilSquare className='font-bold text-lg' /></Button>
              </div>
            )}
          </div>
        </div>

        <div className='my-4'>
          {isEditing ? (
            <>
              <textarea 
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded bg-transparent'
              />
              <div className='flex gap-2'>
                <Button onClick={handleEditPost} className='mt-2'>Salvar</Button>
                <Button onClick={() => setIsEditing(false)} className='mt-2'>Cancelar</Button>
              </div>
            </>
          ) : (
            <p>{editContent}</p>
          )}
        </div>

        <div className='flex border-t border-t-neutral-700 py-4 gap-4'>
          <div className='flex items-center gap-2'>
            <CiHeart className='text-xl cursor-pointer' /> <span>{post.postLikesQuantity} Curtida{post.postLikesQuantity === 1 ? 's' : ''}</span>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
            <TfiComment className='cursor-pointer' /> <span>{commentsQuantity} Comentário{commentsQuantity === 1 ? 's' : ''}</span>
          </div>
        </div>
      </GrayCard>


      {comments.length > 0 && (
        <PostAnswer 
          postAuthor={postAuthor} 
          comments={comments} 
          commentsQuantity={commentsQuantity} 
          setCommentsQuantity={setCommentsQuantity} 
          currentPost={post} 
          isPopupOpen={isPopupOpen} 
          setIsPopupOpen={setIsPopupOpen} 
        />
      )}
    </div>
  );
};
