import { useState } from 'react';
import { GrayCard } from '@/components/common/Card';
import { Popup } from '@/components/common/Popup';
import { Button } from '@/components/common/Button';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import { Comments } from '@/api/comments/comments';

export const PostAnswer = ({
  comments,
  commentsQuantity,
  setCommentsQuantity,
  currentPost,
  postAuthor,
  isPopupOpen,
  setIsPopupOpen
}: {
  comments: Comments[],
  commentsQuantity: number,
  setCommentsQuantity: (quantity: number) => void,
  currentPost: PostType,
  postAuthor: User,
  isPopupOpen: boolean,
  setIsPopupOpen: (isOpen: boolean) => void
}) => {
  const [commentContent, setCommentContent] = useState('');

  const handleNewComment = (commentContent: string) => {
    if (commentContent === '') return;
    setCommentContent('');
    setCommentsQuantity(commentsQuantity + 1);
    // Logic to add a new comment to the server and update the comments state
  };

  return (
    <GrayCard className='rounded-t-none -mt-2 border-t border-neutral-600'>
      <div className='flex gap-2 w-full items-center mb-4'>
        <input
          placeholder={'Escrever resposta'}
          className='w-11/12 bg-transparent placeholder:to-zinc-100 outline-none px-2 pr-4 bg-neutral-900 py-4'
          maxLength={150}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNewComment(commentContent)}
        />
        <Button onClick={() => handleNewComment(commentContent)} className='text-2xl cursor-pointer font-normal'>Responder</Button>
      </div>

      {comments.map((comment, key) => (
        <div key={key} className='mb-4'>
          <div className="flex gap-4">
            <div className="flex flex-col ">
              <img src={DEFAULT_IMAGE_URL} alt='Foto do autor do comentário' className='w-[50px]' />
            </div>
            <div className="flex flex-col gap-1">
              <span className=''>{comment.commentAuthorId}</span>
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
                <div className="flex flex-col ">
                  <img src={DEFAULT_IMAGE_URL} alt='Foto do autor do comentário' className='w-[50px]' />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=''>{comment.commentAuthorId}</span>
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
