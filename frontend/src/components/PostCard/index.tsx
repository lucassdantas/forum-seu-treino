import { CommentsWithAuthors, commentsWithAuthors } from '@/api/users/commentsWithAuthors';
import { GrayCard } from '@/components/common/Card';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { useContext, useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { TfiComment } from 'react-icons/tfi';
import { Button } from '@/components/common/Button';
import { PostType } from '@/api/posts/posts';
import { User } from '@/api/users/user';
import { getUserById } from '@/api/users/getUserById';
import { Oval } from 'react-loader-spinner';
import { UserImage } from '@/components/UserImage';
import { Link } from 'react-router-dom';
import { currentUserContext } from '@/api/users/currentUserContext';
import { deletePost } from '@/api/posts/deletePost';
import { BsTrash3Fill } from 'react-icons/bs';
import { PostAnswer } from '@/components/PostCard/PostAnswer';

type PostCardProps = {
  post: PostType;
  onDelete: (postId: number) => void;
};

export const PostCard = ({ post, onDelete }: PostCardProps) => {
  const commentWithAuthor: CommentsWithAuthors = commentsWithAuthors[0];
  const [commentsWithAuthorsOnComponent, setCommentsWithAuthorsOnComponent] = useState<CommentsWithAuthors[]>(commentsWithAuthors);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postAuthor, setPostAuthor] = useState<User>();
  const [commentsQuantity, setCommentsQuantity] = useState(post.postCommentsQuantity);
  const currentUser = useContext(currentUserContext);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById(post.postAuthorId);
        setPostAuthor(user);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    };

    if (post.postAuthorId !== 0) {
      fetchUserById();
    }
  }, [post.postAuthorId]);

  const handleDeletePost = async () => {
    try {
      await deletePost(post.postId);
      onDelete(post.postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!postAuthor) return <Oval />;
  return (
    <div>
      <GrayCard className=''>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 ">
            <div className="flex flex-col ">
              <UserImage userId={post.postAuthorId} />
            </div>

            <div className="flex flex-col gap-1">
              <Link to={'/perfil?id=' + postAuthor.userId}>{postAuthor.userName}</Link>
              <span className='text-sm opacity-85'>{formatTimeAgo(post.postDateOfCreation)}</span>
            </div>
          </div>
            <div className=''>
              {currentUser?.userId === post.postAuthorId && (
                <Button onClick={handleDeletePost} className='ml-auto'><BsTrash3Fill className='font-bold text-lg' /></Button>
              )}
            </div>

        </div>

        <div className='my-4'>
          <p>{post.postContent}</p>
        </div>

        <div className='flex border-t border-t-neutral-700 py-4 gap-4'>
          <div className='flex items-center gap-2'>
            <CiHeart className='text-xl cursor-pointer' /> <span>{post.postLikesQuantity} Curtida{post.postLikesQuantity === 1 ? 's' : ''}</span>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
            <TfiComment className='cursor-pointer' /> <span>{commentsQuantity} Comentário{commentsQuantity === 1 ? 's' : ''} </span>
          </div>

        </div>
      </GrayCard>
      {commentsWithAuthors.length > 0 && <PostAnswer postAuthor={postAuthor} commentWithAuthor={commentWithAuthor} commentsQuantity={commentsQuantity} setCommentsQuantity={setCommentsQuantity} currentPost={post} commentsWithAuthorsOnComponent={commentsWithAuthorsOnComponent} setCommentsWithAuthorsOnComponent={setCommentsWithAuthorsOnComponent} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};