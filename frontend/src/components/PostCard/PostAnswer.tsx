import { useState } from 'react';
import { GrayCard } from '@/components/common/Card';
import { Popup } from '@/components/common/Popup';
import { Button } from '@/components/common/Button';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import { Comments } from '@/api/comments/comments';
import { UserImage } from '@/components/UserImage';
import { addComment } from '@/api/comments/addComment';
import { fetchComments } from '@/api/comments/fetchComments';

export const PostAnswer = ({
  comments,
  commentsQuantity,
  setCommentsQuantity,
  currentPost,
  setComments,
  postAuthor,
  isPopupOpen,
  setIsPopupOpen,
  currentUser,
}: {
  comments: Comments[],
  commentsQuantity: number,
  setComments:any,
  setCommentsQuantity: (quantity: number) => void,
  currentPost: PostType,
  postAuthor: User,
  isPopupOpen: boolean,
  setIsPopupOpen: (isOpen: boolean) => void,
  currentUser: User
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para controle de submissão

  const handleNewComment = async (commentContent: string) => {
    if (commentContent.trim() === '') return;

    setIsSubmitting(true); // Inicia o carregamento

    try {
      const newComment = {
        commentContent,
        commentPostId: currentPost.postId,
        commentAuthorId: currentUser.userId,
        commentAuthorName: currentUser.userName
      };

      // Envia o comentário para o servidor
      await addComment(newComment);

      // Atualiza a lista de comentários
      const updatedComments = await fetchComments(currentPost.postId);
      setComments(updatedComments);
      setCommentsQuantity(updatedComments.length);
      setCommentContent('');

    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false); // Encerra o carregamento
    }
  };

  return (
    <GrayCard className='rounded-t-none -mt-2 border-t border-neutral-600'>
      <div className='flex gap-2 w-full items-center mb-4'>
        <UserImage userId={currentUser.userId} size={40}/>
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

      {comments.map((comment, key) => (
        <div key={key} className='mb-4'>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <UserImage userId={comment.commentAuthorId} size={40}/>
            </div>
            <div className="flex flex-col gap-1">
              <span className=''>{comment.commentAuthorName}</span>
              <span className='opacity-85'>{formatTimeAgo(comment.commentDateOfCreation)}</span>
            </div>
          </div>
          <div className='mt-4'>
            <p className='break-words'>{comment.commentContent}</p>
          </div>
        </div>
      ))}

      {commentsQuantity > 1 && <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)}>Ver todos os comentários</span>}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className='gap-4 divide-y flex flex-col'>
          {comments.map((comment, key) => (
            <div key={key} className='pt-4'>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <UserImage userId={comment.commentAuthorId} size={40}/>
                </div>
                <div className="flex flex-col gap-1">
                  <span className=''>{comment.commentAuthorName}</span>
                  <span className='opacity-85'>{formatTimeAgo(comment.commentDateOfCreation)}</span>
                </div>
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