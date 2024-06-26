import React from 'react'
import { Button, OutlineButton } from '@/components/common/Button'
import { Limiter }  from '@/components/common/Limiter'
import { GrayCard } from '@/components/common/Card'
import { friends }  from '@/api/friends'
import { posts } from '@/api/posts'
import { postsWithAuthorsInfo } from '@/api/postsWithAuthorsInfo'
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";
import { advertising } from '@/api/advertising'
import tempProfileImage from '@/assets/profile/profilePhoto.png'

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
    <div className='text-white flex flex-col w-1/3 gap-4'>
      <GrayCard>
        <ul className='mb-2'>
          <li>Tópico 1</li>
          <li>Tópico 2</li>
          <li>Tópico 3</li>
          <li>Tópico 4</li>
        </ul>
        <OutlineButton>+ Adicionar tópico</OutlineButton>
      </GrayCard>

      <GrayCard>
        <h4>Sugestões de amizade</h4>
        {
          friends.map((friend, i) => (
            <div className='flex gap-4' key={i}>
              <img src={friend.friendImage} alt='Foto do usuário'/>
              <span>{friend.friendName}</span>
            </div>
          ))
        }
      </GrayCard>
    </div>
  )
}

const MiddleColumn = () => {
  return(
    <div className='text-white flex flex-col w-1/3 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
            <img src={tempProfileImage} alt='Foto do usuário' className='w-[50px]'/> 
            <input placeholder={'No que você está pensando, ' + 'Arthur?'}/>
        </div>
        <Button>Publicar</Button>
      </GrayCard>
      {
        postsWithAuthorsInfo.map((post, i) => (
          <GrayCard>

            <div className="flex">
              <div className="flex flex-col">
                  <img src={post.authorImage} alt='Foto do autor do post'/>
              </div>
              <div className="flex flex-col">
                <span>{post.author}</span>
                <span>{post.dateOfCreation}</span>
              </div>
            </div>

            <div className='my-4'>
              <p>{post.postContent}</p>
            </div>

            <div className='flex border-t border-t-white py-2 gap-4'>
              <div className='flex items-center gap-2'>
                <CiHeart className=''/> <span>Curtidas {post.likesQuantity}</span>
              </div>
              <div className='flex items-center gap-2'>
                <TfiComment className=''/> <span>Comentários {post.commentsQuantity}</span>
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
    <div className='text-white flex flex-col w-1/3 gap-4'>
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