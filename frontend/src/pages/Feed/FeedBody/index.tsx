import React from 'react'
import { Button, OutlineButton } from '@/components/common/Button'
import { Limiter }  from '@/components/common/Limiter'
import { GrayCard } from '@/components/common/Card'
import { posts } from '@/api/posts'
import { postsWithAuthorsInfo } from '@/api/postsWithAuthorsInfo'
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";
import { advertising } from '@/api/advertising'
import tempProfileImage from '@/assets/profile/profilePhoto.png'
import { IoPersonAddOutline } from "react-icons/io5";
import { friendsSuggestion } from '@/api/friendsSuggestion'
import { topics } from '@/api/topics'
import { formatTimeAgo } from '@/utils/formatTimeAgo'

export const FeedBody = () => {


  return (
    <div className='bg-black w-full flex justify-center'>
      <Limiter>
        <div className='flex gap-12 pt-4'>
          <LeftColumn/>
          <MiddleColumn/>
          <RightColumn/>
        </div>
      </Limiter>
    </div>
    
  )
}


const LeftColumn = () => {
  return(
    <div className='text-white flex flex-col w-1/4 gap-4'>
      <GrayCard>
        <ul className='mb-2 divide-y'>
          {topics.map((topic, i) => (
            <li className={`py-4 `} key={i}>{topic.name}</li>
          ))}
        </ul>
        <OutlineButton>+ Adicionar tópico</OutlineButton>
      </GrayCard>

      <GrayCard>
        <h4 className='mb-4'>Sugestões de amizade</h4>
        <div className='divide-y divide-neutral-700'>
          {
            friendsSuggestion.map((friend, i) => (
              <div className={`flex gap-4 items-center justify-between  py-4`} key={i}>

                <div className='flex items-center gap-4'>
                  <img src={friend.friendImage} alt='Foto do usuário' className='w-[40px]'/>
                  <span>{friend.friendName}</span>
                </div>

                <div className='cursor-pointer '>
                  <IoPersonAddOutline className=''/>
                </div>
              </div>
            ))
          }
        </div>
        
      </GrayCard>
    </div>
  )
}

const MiddleColumn = () => {
  return(
    <div className='text-white flex flex-col w-2/4 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
            <img src={tempProfileImage} alt='Foto do usuário' className='w-[50px]'/> 
            <input placeholder={'No que você está pensando, ' + 'Arthur?'} className='w-full bg-transparent placeholder:to-zinc-100 outline-1 '/>
        </div>
        <div className='flex justify-end'>
          <Button className='w-full'>Publicar</Button>
        </div>
      </GrayCard>
      {
        postsWithAuthorsInfo.map((post, i) => (
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

            <div className='border-t'>

            </div>
          </GrayCard>
        ))
      }
    </div>
  )

}

const RightColumn = () => {
  return (
    <div className='text-white flex flex-col w-1/4 gap-4'>
      {
        advertising.map((ads, i) => (
          <div key={i} className=''>
            <img src={ads.img} alt='Propaganda'/>

          </div>
        ))
      }
    </div>
  )
}