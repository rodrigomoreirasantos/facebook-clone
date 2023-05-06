import Image from 'next/image'
import React from 'react'

function Contact({name, src}:any) {
  return (
    <div className='flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2'>
        <Image 
            className='rounded-full h-10' 
            src={src}
            alt=''
            width={40}
            height={40}
            style={{objectFit: "cover", }}
        />
        <p>{name}</p>
        <div className='absolute bottom-2 left-5 bg-green-400 h-3 w-3 rounded-full animate-bounce'/>
    </div>
  )
}

export default Contact