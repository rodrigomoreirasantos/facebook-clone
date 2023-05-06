import Image from 'next/image'
import React from 'react'

export default function StoryCard({ name, src, profile }:any) {
  return (
    <div className='relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3'>
        <Image 
            className='absolute h-10 opacity-0 lg:opacity-100 rounded-full z-50 top-3'
            src={profile}
            alt= "Profile img"
            width={40}
            height={40}
        />
        <Image
            className='object-cover filter brightness-75 rounded-full lg:rounded-3xl'
            src={src}
            alt="Image src"
            fill
        />
    </div>
  )
}
