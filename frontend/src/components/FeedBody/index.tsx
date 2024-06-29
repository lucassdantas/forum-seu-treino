import React from 'react'
import { Button, OutlineButton } from '@/components/common/Button'
import { Limiter }  from '@/components/common/Limiter'
import { GrayCard } from '@/components/common/Card'
import { friends }  from '@/api/friends'
import { posts } from '@/api/posts'
import { postsWithAuthorsInfo } from '@/api/postsWithAuthorsInfo'
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";

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
    <div className='text-white flex flex-col w-1/3'>
      <GrayCard>
        <div className='flex gap-4'>
            <img src='#' alt='Foto do usuário'/> <input placeholder={'No que você está pensando, ' + 'Arthur?'}/>
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
            <div className='flex border-t-2 border-t-white py-2'>
              <span><CiHeart/> Curtidas {post.likesQuantity}</span>
              <span><TfiComment /> Comentários {post.commentsQuantity}</span>
            </div>
          </GrayCard>
        ))
      }
    </div>
  )

}

const RightColumn = () => {
  return (
    <div className='text-white flex flex-col w-1/3'>

    </div>
  )
}