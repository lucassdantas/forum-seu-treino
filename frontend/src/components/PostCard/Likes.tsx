// components/PostCard/Likes.tsx
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

type LikesProps = {
  isLiked: boolean;
  likesQuantity: number;
  handlePostLike: () => void;
};

export const Likes = ({ isLiked, likesQuantity, handlePostLike }: LikesProps) => {
  return (
    <div className='flex items-center gap-2'>
      {isLiked ? (
        <FaHeart className='text-xl cursor-pointer text-yellow-seu-treino' onClick={handlePostLike} />
      ) : (
        <CiHeart className='text-xl cursor-pointer' onClick={handlePostLike} />
      )}
      <span>{likesQuantity} Curtida{likesQuantity === 1 ? '' : 's'}</span>
    </div>
  );
};
