import { TfiComment } from 'react-icons/tfi';

type CommentsProps = {
  commentsQuantity: number;
  setIsPopupOpen: (isOpen: boolean) => void;
};

export const CommentsComponent = ({
  commentsQuantity,
  setIsPopupOpen,
}: CommentsProps) => (
  <div className={`${commentsQuantity > 0? `cursor-pointer`:''} flex items-center gap-2 ` } onClick={() => {if(commentsQuantity > 0)setIsPopupOpen(true)}}>
    <TfiComment /> <span>{commentsQuantity} Comentário{commentsQuantity === 1 ? '' : 's'}</span>
  </div>
);
