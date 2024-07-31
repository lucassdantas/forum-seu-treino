import { useState, useEffect } from 'react';
import { GrayCard } from '@/components/common/Card';
import { Popup } from '@/components/common/Popup';
import { Button } from '@/components/common/Button';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { PostType } from '@/types/posts';
import { User } from '@/types/user';
import { Comments } from '@/types/comments';
import { UserImage } from '@/components/UserImage';
import { addComment } from '@/api/comments/addComment';
import { fetchComments } from '@/api/comments/fetchComments';
import { deleteComment } from '@/api/comments/deleteComments'; // Importe a função de exclusão
import { TiDelete } from 'react-icons/ti';
import { getUserById } from '@/api/users/getUserById';
import { Link } from 'react-router-dom';

export const PostAnswer = ({
  comments,
  commentsQuantity,
  setComments,
  setCommentsQuantity,
  currentPost,
  postAuthor,
  isPopupOpen,
  setIsPopupOpen,
  currentUser,
}: {
  comments: Comments[],
  commentsQuantity: number,
  setComments: (comments: Comments[]) => void,
  setCommentsQuantity: (quantity: number) => void,
  currentPost: PostType,
  postAuthor: User,
  isPopupOpen: boolean,
  setIsPopupOpen: (isOpen: boolean) => void,
  currentUser: User
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentAuthors, setCommentAuthors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchCommentAuthors = async () => {
      const authorNames: { [key: number]: string } = {};

      for (const comment of comments) {
        if (!commentAuthors[comment.commentAuthorId]) {
          const user = await getUserById(comment.commentAuthorId);
          authorNames[comment.commentAuthorId] = user.userName;
        }
      }

      setCommentAuthors((prev) => ({ ...prev, ...authorNames }));
    };

    fetchCommentAuthors();
  }, [comments]);

  const handleNewComment = async (commentContent: string) => {
    if (commentContent.trim() === '') return;

    setIsSubmitting(true);

    try {
      const newComment = {
        commentContent,
        commentPostId: currentPost.postId,
        commentAuthorId: currentUser.userId,
        commentAuthorName: currentUser.userName,
      };

      await addComment(newComment);

      const updatedComments = await fetchComments(currentPost.postId);
      setComments(updatedComments);
      setCommentsQuantity(updatedComments.length);
      setCommentContent('');

    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      const updatedComments = comments.filter((comment) => comment.commentId !== commentId);
      setComments(updatedComments);
      setCommentsQuantity(updatedComments.length);

    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Limitar a exibição a no máximo 2 comentários
  const displayedComments = comments.slice(0, 2);

  return (
    <GrayCard className='rounded-t-none -mt-2 border-t border-neutral-600'>
      <div className='flex gap-2 w-full items-center mb-4'>
        <UserImage userId={currentUser.userId} size={40} />
        <input
          placeholder={'Escrever resposta'}
          className='w-11/12 bg-transparent placeholder:to-zinc-100 outline-none px-2 pr-4 bg-neutral-900 py-4'
          maxLength={150}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && handleNewComment(commentContent)}
        />
        <Button
          onClick={() => !isSubmitting && handleNewComment(commentContent)}
          className='text-2xl cursor-pointer font-normal'
        >
          {isSubmitting ? 'Comentar...' : 'Comentar'}
        </Button>
      </div>

      {displayedComments.map((comment) => (
        <div key={comment.commentId} className='mb-4'>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <UserImage userId={comment.commentAuthorId} size={40} />
              </div>
              <div className="flex flex-col gap-1">
                <Link className='flex flex-col gap-1' to={`/profile?id=${comment.commentAuthorId}`}>
                  <span className=''>{commentAuthors[comment.commentAuthorId]}</span>
                  <span className='opacity-85'>{formatTimeAgo(comment.commentDateOfCreation)}</span>
                </Link>
              </div>
              {(comment.commentAuthorId === currentUser.userId || currentUser.userRole === 'admin') && (
                <TiDelete
                  onClick={() => handleDeleteComment(comment.commentId)}
                  className='ml-auto flex h-fit rounded-full text-xl font-bold text-orange-seu-treino cursor-pointer'
                />
              )}
            </div>
          <div className='mt-4'>
            <p className='break-words'>{comment.commentContent}</p>
          </div>
        </div>
      ))}

      {commentsQuantity > 2 && (
        <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
          Ver todos os comentários
        </span>
      )}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className='gap-4 divide-y flex flex-col'>
          {comments.map((comment) => (
            <div key={comment.commentId} className='pt-4'>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <UserImage userId={comment.commentAuthorId} size={40} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=''>{commentAuthors[comment.commentAuthorId]}</span>
                  <span className='opacity-85'>{formatTimeAgo(comment.commentDateOfCreation)}</span>
                </div>
                {(comment.commentAuthorId === currentUser.userId || currentUser.userRole === 'admin') && (
                  <TiDelete
                    onClick={() => handleDeleteComment(comment.commentId)}
                    className='ml-auto flex h-fit rounded-full text-xl font-bold text-orange-seu-treino cursor-pointer'
                  />
                )}
              </div>
              <div className='mt-4'>
                <p className='break-words'>{comment.commentContent}</p>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    </GrayCard>
  );
};