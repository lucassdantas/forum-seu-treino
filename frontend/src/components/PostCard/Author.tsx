// components/PostCard/Author.tsx
import { Link } from 'react-router-dom';
import { UserImage } from '@/components/UserImage';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { User } from '@/types/user';

type AuthorProps = {
  postAuthor: User | null;
  postDateOfCreation: string;
};

export const Author = ({ postAuthor, postDateOfCreation }: AuthorProps) => {
  if (!postAuthor) return null;

  return (
    <div className="flex gap-4">
      <UserImage userId={postAuthor.userId} userHasImage={postAuthor.userHasImage}  />
      <div className="flex flex-col gap-1">
        <Link to={'/perfil?id=' + postAuthor.userId}>{postAuthor.userName}</Link>
        <span className='text-sm opacity-85'>{formatTimeAgo(postDateOfCreation)}</span>
      </div>
    </div>
  );
};
