import { PostWithAuthors } from '@/api/posts/postsWithAuthorsInfo'
import { CommentsWithAuthors, commentsWithAuthors } from '@/api/users/commentsWithAuthors'
import { GrayCard } from '@/components/common/Card'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { TfiComment } from 'react-icons/tfi'
import { Popup } from '@/components/common/Popup';
import { Button } from '@/components/common/Button'

type PostCardProps = {
    post: PostWithAuthors
}

export const PostCard = ({ post }: PostCardProps) => {
    const commentWithAuthor: CommentsWithAuthors = commentsWithAuthors[0]
    const [commentsWithAuthorsOnComponent, setCommentsWithAuthorsOnComponent] = useState<CommentsWithAuthors[]>(commentsWithAuthors)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [commentsQuantity, setCommentsQuantity] = useState(post.commentsQuantity)

    return (
        <div>
            <GrayCard className=''>
                <div className="flex gap-4">
                    <div className="flex flex-col ">
                        <img src={post.authorImage} alt='Foto do autor do post' className='w-[50px]' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span>{post.authorName}</span>
                        <span className='text-sm opacity-85'>{formatTimeAgo(post.dateOfCreation)}</span>
                    </div>
                </div>

                <div className='my-4'>
                    <p>{post.postContent}</p>
                </div>

                <div className='flex border-t border-t-neutral-700 py-4 gap-4'>
                    <div className='flex items-center gap-2'>
                        <CiHeart className='text-xl cursor-pointer' /> <span>{post.likesQuantity} Curtida{post.likesQuantity === 1 ? 's' : ''}</span>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
                        <TfiComment className='cursor-pointer' /> <span>{commentsQuantity} Comentário{commentsQuantity === 1 ? 's' : ''} </span>
                    </div>
                </div>
            </GrayCard>
            {commentsWithAuthors.length > 0 && <PostAnswer commentWithAuthor={commentWithAuthor} commentsQuantity={commentsQuantity} setCommentsQuantity={setCommentsQuantity} currentPost={post} commentsWithAuthorsOnComponent={commentsWithAuthorsOnComponent} setCommentsWithAuthorsOnComponent={setCommentsWithAuthorsOnComponent} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />}
        </div>
    )
}

const PostAnswer = ({ commentWithAuthor, commentsQuantity, setCommentsQuantity, currentPost, commentsWithAuthorsOnComponent, setCommentsWithAuthorsOnComponent, isPopupOpen, setIsPopupOpen }: { commentWithAuthor: CommentsWithAuthors, commentsQuantity: number, setCommentsQuantity: any, currentPost: PostWithAuthors, commentsWithAuthorsOnComponent: CommentsWithAuthors[], setCommentsWithAuthorsOnComponent: any, isPopupOpen: boolean, setIsPopupOpen: any }) => {
    const [commentContent, setCommentContent] = useState('')
    const handleNewComment = (commentContent: string) => {
      if(commentContent == '') return
        setCommentContent('')
        setCommentsWithAuthorsOnComponent([...commentsWithAuthorsOnComponent, {
            commentId: commentsWithAuthorsOnComponent.length + 1,
            authorId: 3,
            postId: currentPost.postId,
            authorImage: currentPost.authorImage,
            authorName: commentWithAuthor.authorName,
            commentContent: commentContent,
            dateOfCreation: new Date().toString(),
        }])
        setCommentsQuantity(commentsQuantity + 1)
    }
    return (
        <GrayCard className='rounded-t-none -mt-2 border-t border-neutral-600'>
            <div className="flex gap-4">
                <div className="flex flex-col ">
                    <img src={commentWithAuthor.authorImage} alt='Foto do autor do post' className='w-[50px]' />
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
                                <p>{comment.commentContent}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Popup>
        </GrayCard>
    )
}
