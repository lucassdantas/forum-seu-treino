import { GrayCard } from '@/components/common/Card'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { TfiComment } from 'react-icons/tfi'

type PostCardProps = {
    post:any
}

export const PostCard = ({post}:PostCardProps) => {
  return (
    <GrayCard>
    <div className="flex gap-4">

      <div className="flex flex-col ">
          <img src={post.authorImage} alt='Foto do autor do post' className='w-[50px]'/>
      </div>

      <div className="flex flex-col gap-1">
        <span>{post.author}</span>
        <span className='text-sm opacity-85'>{formatTimeAgo(post.dateOfCreation)}</span>
      </div>

    </div>

    <div className='my-4'>
      <p>{post.postContent}</p>
    </div>

    <div className='flex border-t border-t-neutral-700 py-4 gap-4'>
      <div className='flex items-center gap-2'>
        <CiHeart className='text-xl cursor-pointer'/> <span>Curtidas {post.likesQuantity}</span>
      </div>
      <div className='flex items-center gap-2'>
        <TfiComment className='cursor-pointer'/> <span>Comentários {post.commentsQuantity}</span>
      </div>
    </div>
    {
      post.commentsQuantity
    }
    <div className='border-t'>

    </div>
  </GrayCard>
  )
}
