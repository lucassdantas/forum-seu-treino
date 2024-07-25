import { useContext, useEffect, useState } from 'react';
import { BsTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { GrayCard } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { PostAnswer } from '@/components/PostCard/PostAnswer';
import { currentUserContext } from '@/api/users/currentUserContext';
import { getUserById } from '@/api/users/getUserById';
import { deletePost } from '@/api/posts/deletePost';
import { getCommentsByPostId } from '@/api/comments/getCommentsByPostId';
import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import { Comments } from '@/api/comments/comments';
import { editPost, PostToEdit } from '@/api/posts/editPost';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { likePost, unlikePost } from '@/api/likes/likePost';
import axios from 'axios';
import { Author } from './Author';
import { Content } from './Content';
import { Likes } from './Likes';
import { CommentsComponent } from './CommentsComponent';

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
  const [isLiked, setIsLiked] = useState(false);
  const [likesQuantity, setLikesQuantity] = useState(post.postLikesQuantity);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controle de carregamento
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
        setCommentsQuantity(comments.length)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post.postId]);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get('http://localhost/backend/controllers/likeController.php');
        const likes = response.data;
        const isAlreadyLiked = likes.some(
          (like: { likeAuthorId: number; likePostId: number }) => 
            like.likeAuthorId === currentUser.userId && like.likePostId === post.postId
        );
        setIsLiked(isAlreadyLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    checkIfLiked();
  }, [post.postId, currentUser.userId]);

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
      const postToEdit: PostToEdit = {
        postId: post.postId,
        postContent: editContent,
        postLikesQuantity: likesQuantity,
        postCommentsQuantity: commentsQuantity,
        postHasImage: post.postHasImage,
        postTopicId: post.postTopicId,
      };
      await editPost(postToEdit);
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handlePostLike = async () => {
    setIsLoading(true); // Inicia o carregamento

    const updatedLikesQuantity = isLiked ? likesQuantity - 1 : likesQuantity + 1;
    setLikesQuantity(updatedLikesQuantity);
    setIsLiked(!isLiked);

    try {
      const likeData = {
        likeAuthorId: currentUser?.userId!,
        likePostId: post.postId,
      };

      if (isLiked) {
        await unlikePost(likeData);
      } else {
        await likePost(likeData);
      }

      const postToEdit: PostToEdit = {
        postId: post.postId,
        postContent: editContent,
        postLikesQuantity: updatedLikesQuantity,
        postCommentsQuantity: commentsQuantity,
        postHasImage: post.postHasImage,
        postTopicId: post.postTopicId,
      };
      await editPost(postToEdit);
    } catch (error) {
      console.error('Error updating likes:', error);
    } finally {
      setIsLoading(false); // Encerra o carregamento
    }
  };

  if (!postAuthor) return <LoadingSpinner />;

  return (
    <div>
      <GrayCard>
        <div className="flex w-full justify-between items-center">
          <Author
            postAuthor={postAuthor}
            postDateOfCreation={post.postDateOfCreation}
          />

          <div>
            {currentUser?.userId === post.postAuthorId && (
              <div className='flex gap-2'>
                <Button onClick={handleDeletePost} className='ml-auto'>
                  <BsTrash3Fill className='font-bold text-lg' />
                </Button>
                <Button onClick={() => setIsEditing(true)} className='ml-auto'>
                  <BsPencilSquare className='font-bold text-lg' />
                </Button>
              </div>
            )}
          </div>
        </div>

        <Content
          isEditing={isEditing}
          editContent={editContent}
          setEditContent={setEditContent}
          handleEditPost={handleEditPost}
          setIsEditing={setIsEditing}
        />

        <div className='flex border-t border-t-neutral-700 py-4 gap-4'>
          <Likes
            isLiked={isLiked}
            likesQuantity={likesQuantity}
            handlePostLike={handlePostLike}
            isLoading={isLoading} // Passa o estado de carregamento
          />
          <CommentsComponent
            commentsQuantity={commentsQuantity}
            setIsPopupOpen={setIsPopupOpen}
          />
        </div>
      </GrayCard>

      <PostAnswer
        postAuthor={postAuthor}
        comments={comments}
        commentsQuantity={commentsQuantity}
        setCommentsQuantity={setCommentsQuantity}
        currentPost={post}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        currentUser={currentUser}
      />
    </div>
  );
};