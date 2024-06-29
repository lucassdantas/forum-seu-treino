import React from 'react'
import bannerImage from '@/assets/banner-image.png'

export const Banner = () => {
  return (
    <div className='w-full'>
      <img src={bannerImage} alt='Banner image' className='w-full'/>
    </div>
  )
}
