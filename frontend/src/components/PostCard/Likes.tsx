import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type LikesProps = {
  isLiked: boolean;
  likesQuantity: number;
  handlePostLike: () => void;
  isLoading: boolean; // Novo prop para controle de carregamento
};

export const Likes = ({ isLiked, likesQuantity, handlePostLike, isLoading }: LikesProps) => {
  return (
    <div className='flex items-center gap-2'>
      {isLoading ? (
        <LoadingSpinner size={25} /> // Mostra o spinner se estiver carregando
      ) : isLiked ? (
        <FaHeart className='text-xl cursor-pointer text-yellow-seu-treino' onClick={handlePostLike} />
      ) : (
        <CiHeart className='text-xl cursor-pointer' onClick={handlePostLike} />
      )}
      {!isLoading && <span>{likesQuantity} Curtida{likesQuantity === 1 ? '' : 's'}</span>}
    </div>
  );
};
