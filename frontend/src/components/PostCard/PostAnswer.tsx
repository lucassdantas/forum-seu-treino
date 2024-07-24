import { CommentsWithAuthors} from '@/api/users/commentsWithAuthors';
import { GrayCard } from '@/components/common/Card';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import {  useState } from 'react';
import { Popup } from '@/components/common/Popup';
import { Button } from '@/components/common/Button';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';

export const PostAnswer = ({ commentWithAuthor, commentsQuantity, setCommentsQuantity, currentPost, commentsWithAuthorsOnComponent, setCommentsWithAuthorsOnComponent, postAuthor, isPopupOpen, setIsPopupOpen }: { commentWithAuthor: CommentsWithAuthors, commentsQuantity: number, setCommentsQuantity: any, currentPost: PostType, commentsWithAuthorsOnComponent: CommentsWithAuthors[], setCommentsWithAuthorsOnComponent: any, postAuthor: User, isPopupOpen: boolean, setIsPopupOpen: any }) => {
  const [commentContent, setCommentContent] = useState('');
  const handleNewComment = (commentContent: string) => {
    if (commentContent === '') return;
    setCommentContent('');
    setCommentsWithAuthorsOnComponent([...commentsWithAuthorsOnComponent, {
      commentId: commentsWithAuthorsOnComponent.length + 1,
      authorId: 3,
      postId: currentPost.postId,
      authorImage: postAuthor.userProfileImage,
      authorName: commentWithAuthor.authorName,
      commentContent: commentContent,
      dateOfCreation: new Date().toString(),
    }]);
    setCommentsQuantity(commentsQuantity + 1);
  };
  const authorImage = commentWithAuthor.authorImage || DEFAULT_IMAGE_URL;
  return (
    <GrayCard className='rounded-t-none -mt-2 border-t border-neutral-600'>
      <div className="flex gap-4">
        <div className="flex flex-col ">
          <img src={authorImage} alt='Foto do autor do post' className='w-[50px]' />
        </div>

        <div className="flex flex-col gap-1">
          <span className=''>{commentWithAuthor.authorName}</span>
          <span className='opacity-85'>{formatTimeAgo(commentWithAuthor.dateOfCreation)}</span>
        </div>
      </div>

      <div className='my-4'>
        <p>{commentWithAuthor.commentContent}</p>
      </div>
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

      {commentsQuantity > 1 && <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)} >Ver todos os comentários</span>}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className=' gap-4 divide-y flex flex-col'>
          {commentsWithAuthorsOnComponent.map((comment, key) => (
            <div key={key} className='pt-4'>
              <div className="flex gap-4">
                <div className="flex flex-col ">
                  <img src={comment.authorImage} alt='Foto do autor do post' className='w-[50px]' />
                </div>

                <div className="flex flex-col gap-1">
                  <span className=''>{comment.authorName}</span>
                  <span className='opacity-85'>{formatTimeAgo(comment.dateOfCreation)}</span>
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