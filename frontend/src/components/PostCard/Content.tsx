// components/PostCard/Content.tsx
import { Button } from '@/components/common/Button';

type ContentProps = {
  isEditing: boolean;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  handleEditPost: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Content = ({
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
        <p>{editContent}</p>
      )}
    </div>
  );
};
