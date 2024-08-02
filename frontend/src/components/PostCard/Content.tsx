// components/PostCard/Content.tsx
import { Button } from '@/components/common/Button';
import { DEFAULT_POST_DIRECTORY } from '@/constants';

type ContentProps = {
  isEditing: boolean;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  handleEditPost: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  postHasImage:boolean | number | string;
  postId:number;
};

export const Content = ({
  postId,
  postHasImage,
  isEditing,
  editContent,
  setEditContent,
  handleEditPost,
  setIsEditing,
}: ContentProps) => {
  return (
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
        <>
          {postHasImage == 1 && <img src={`${location.origin + DEFAULT_POST_DIRECTORY + postId}/${postId}.jpg`}/>}
          <p>{editContent}</p>
        </>
      )}
    </div>
  );
};
