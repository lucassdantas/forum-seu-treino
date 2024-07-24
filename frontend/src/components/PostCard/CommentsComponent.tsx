import { TfiComment } from 'react-icons/tfi';

type CommentsProps = {
  commentsQuantity: number;
  setIsPopupOpen: (isOpen: boolean) => void;
};

export const CommentsComponent = ({
  commentsQuantity,
  setIsPopupOpen,
}: CommentsProps) => (
  <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
    <TfiComment className='cursor-pointer' /> <span>{commentsQuantity} Comentário{commentsQuantity === 1 ? '' : 's'}</span>
  </div>
);
