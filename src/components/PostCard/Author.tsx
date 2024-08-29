// components/PostCard/Author.tsx
import { Link } from 'react-router-dom';
import { UserImage } from '@/components/UserImage';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { User } from '@/types/user';
import { checkUserRole } from '@/utils/checkUserRole';

type AuthorProps = {
  postAuthor: User | null;
  postDateOfCreation: string;
  postIsEdited:boolean | number | string | undefined;
};

export const Author = ({ postAuthor, postDateOfCreation }: AuthorProps) => {
  if (!postAuthor) return null;
  return (
    <div className="flex gap-4">
      <UserImage userId={postAuthor.userId} userHasImage={postAuthor.userHasImage}  />
      <div className="flex flex-col gap-1">
        <div className='flex gap-4'>
          <Link to={'/perfil?id=' + postAuthor.userId}>{postAuthor.userName} - <strong>{checkUserRole(postAuthor.userRole)}</strong></Link>
        </div>
        <span className='text-sm opacity-85'>{formatTimeAgo(postDateOfCreation)}</span>
      </div>
    </div>
  );
};
