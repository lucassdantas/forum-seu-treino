import React, { useState } from 'react'
import { Button, OutlineButton } from '@/components/common/Button'
import { Limiter }  from '@/components/common/Limiter'
import { GrayCard } from '@/components/common/Card'
import { posts } from '@/api/posts'
import { postsWithAuthorsInfo as externalPosts, PostWithAuthors } from '@/api/postsWithAuthorsInfo'
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";
import { advertising } from '@/api/advertising'
import tempProfileImage from '@/assets/profile/profilePhoto.png'
import { IoPersonAddOutline } from "react-icons/io5";
import { friendsSuggestion } from '@/api/friendsSuggestion'
import { topics } from '@/api/topics'
import { formatTimeAgo } from '@/utils/formatTimeAgo'
import { PostCard } from '@/pages/Feed/components/PostCard'

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
  const [postsWithAuthorsInfo, setPosts] = useState<PostWithAuthors[]>(externalPosts)
  const [currentPostContent, setCurrentPostContent] = useState<string>('')

  const handleNewPost = (postContent:string) => {
    setCurrentPostContent('')

    const newPost:PostWithAuthors = {
      id:0,
      author:'Arthur Nunes',
      authorImage:tempProfileImage,
      postContent: postContent,
      dateOfCreation:new Date().toISOString(),
      likesQuantity:0,
      commentsQuantity:0,
    }
    setPosts([newPost, ...postsWithAuthorsInfo])
  }

  return(
    <div className='text-white flex flex-col w-2/4 gap-4'>
      <GrayCard>
        <div className='flex gap-4 mb-4'>
            <img src={tempProfileImage} alt='Foto do usuário' className='w-[50px]'/> 
            <input placeholder={'No que você está pensando, ' + 'Arthur?'} className='w-full bg-transparent placeholder:to-zinc-100 outline-1 px-2 ' value={currentPostContent} onChange={(e) => setCurrentPostContent(e.target.value) }/>
        </div>
        <div className='flex justify-end'>
          <Button className='w-full' onClick={() => handleNewPost(currentPostContent)}>Publicar</Button>
        </div>
      </GrayCard>

      {
        postsWithAuthorsInfo.map((post, i) => <PostCard key={i} post={post}/>)
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